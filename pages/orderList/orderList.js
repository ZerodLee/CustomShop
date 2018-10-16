// pages/orderList/orderList.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')

const app = getApp()
const http = new Http()
const aes =  require('../../asset/js/aes')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchItems: {
      all: 0,
      topay: 1,
      toShip: 2,
      toSigning: 3,
      toComment: 4
    },
    orderStates: ['无', '待付款', '待发货', '待收货', '待评价', '订单取消', '交易关闭', '交易完成', '售后中'],
    orderList: [{
        list: [],
        count: 0,
        page: {
          index: 1,
          limit: 10
        },
        isOnload: false,
        isOver: false
      },
      {
        list: [],
        count: 0,
        page: {
          index: 1,
          limit: 10
        },
        isOnload: false,
        isOver: false
      },
      {
        list: [],
        count: 0,
        page: {
          index: 1,
          limit: 10
        },
        isOnload: false,
        isOver: false
      },
      {
        list: [],
        count: 0,
        page: {
          index: 1,
          limit: 10
        },
        isOnload: false,
        isOver: false
      },
      {
        list: [],
        count: 0,
        page: {
          index: 1,
          limit: 10
        },
        isOnload: false,
        isOver: false
      }
    ],
    listIndex: 0,
    pageParam: {
      userid: 0,
      status: 5,
      page: 1,
      limit: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      'pageParam.userid': app.globalData.user.id
    })
    this.loadOrderByState()
    console.log('options', options)
    let state = options.state ? options.state : 'all'
    this.switchTab(null, this.data.switchItems[state])
  },
  swiperChange(e) {
    //console.log('change',e)
    this.setData({
      listIndex: e.detail.current
    })
    this.loadOrderByState(e.detail.current)
  },
  switchTab(e, target) {
    let index = target == undefined ? e.currentTarget.dataset.index : target
    console.log(index)
    if (index != this.data.listIndex) {
      this.setData({
        listIndex: index
      })
    }

  },
  loadOrderByState(state = 5, reload = false, page = 1, limit = 10) {
    let that = this
    let index = (state == 5 ? 0 : state)
    if (that.data.orderList[index].isOnload && !reload) {
      return false
    }
    let params = {
      userid: app.globalData.user.id,
      status: state,
      page: page,
      limit: limit
    }

    util.showLoading()
    http.tokenPostRequest(url.getOrderlist, params, app.globalData.user.token).then(res => {
      console.log(res)
      if (res.data.returnCode == '200') {
        let orderList = res.data.data2.list.map(v => {
          v.time = util.formatTime(new Date(v.timeline * 1000))
          v.state = that.data.orderStates[v.status]
          return v
        })
        let orderIndex = 'orderList[' + index + ']'
        orderList = reload ? [...that.data.orderList[index].list, ...orderList] : orderList
        that.setData({
          [orderIndex + '.list']: orderList,
          [orderIndex + '.count']: res.data.data2.count,
          [orderIndex + '.isOnload']: true,
          [orderIndex + '.page.index']: params.page,
          [orderIndex + '.isOver']: (orderList.length == res.data.data2.count),
        })
      }
    }).catch(res => {
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  loadMore(e) {
    let index = e.currentTarget.dataset.index
    let state = index == 0 ? 5 : index
    let page = this.data.orderList[index].page.index + 1
    this.loadOrderByState(state, true, page)
  },
  justPay(e){
    let that = this
    let orderId = e.currentTarget.dataset.id
    http.postRequest(url.getPayParam,{id:orderId,type:2,uid:app.globalData.user.id,trade_type:'JSAPI'}).then(res =>{
      if(res.data.returnCode == '200'){
        let payParam = aes.Decrypt(res.data.data)
        payParam = JSON.parse(payParam.match(/({.*})/)[1])
        console.log(payParam)
        wx.requestPayment({
          'timeStamp': (payParam.timeStamp+''),
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': 'MD5',
          'paySign': payParam.sign,
          'success': function (resp) {
            console.log('ok', resp)
            util.toast('支付成功！')
            setTimeout(() => {
              wx.redirectTo({
                url: '../orderList/orderList'
              })
            }, 2000);
          },
          'fail': function (res) {
              console.log(res)
              setTimeout(function () { util.toast('支付未完成','none') }, 500)
          }
        })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  cancelOrder(e) {
    let that = this
    util.showLoading()
    http.tokenPostRequest(url.cancelOrder, {
      id: e.currentTarget.dataset.id,
      userid: app.globalData.user.id
    }, app.globalData.user.token).then(res => {
      console.log(res)
      if (res.data.returnCode == '200') {
        util.toast(res.data.msg)
        that.setData({
          'orderList[1].isOnload':false
        })
        that.loadOrderByState(1)
      } else {
        throw res.data.msg
      }
    }).catch(res => {
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  remindOrder(e) {
    let that = this
    util.showLoading()
    http.tokenPostRequest(url.remindOrder, {
      id: e.currentTarget.dataset.id,
      userid: app.globalData.user.id
    }, app.globalData.user.token).then(res => {
      console.log(res)
      if (res.data.returnCode == '200') {
        util.toast(res.data.msg)
      } else {
        throw res.data.msg
      }
    }).catch(res => {
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  //确认收货
  confrimOrder(e) {
    let that = this
    util.openConfirm('提示', '确定收货吗？', function () {
      util.showLoading()
      http.tokenPostRequest(url.confrimOrder, {
        oid: e.currentTarget.dataset.id,
        userid: app.globalData.user.id
      }, app.globalData.user.token).then(res => {
        console.log(res)
        if (res.data.returnCode == '200') {
          util.toast(res.data.msg)
          //重新刷新页面！
          that.setData({
            'orderList[3].isOnload':false
          })
          that.loadOrderByState(3)
        } else {
          throw res.data.msg
        }
      }).catch(res => {
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
      })
    })
  },
  //查看物流
  seeWuliu: function (e) {
    var orderno = e.currentTarget.dataset.orderno
    if (orderno) {
      // http.getRequest(url.see_wuliu, {
      //   danhao:orderno
      // }).then(res => {
      //   console.log(res)
      // })

      wx.navigateTo({
        url:"../webview/webview?url="+url.see_wuliu+"&params="+JSON.stringify({danhao:orderno})
      })
    }
    else{
      util.toast("当前商品不存在物流信息,请稍后再试！","none")
    }
  },
  goComment(e) {
    let order = this.data.orderList[4].list.filter(v => v.id == e.currentTarget.dataset.id)[0]
    
    console.log(order)
    wx.navigateTo({
      url:'../comment/comment?proinfo=' + JSON.stringify(order)
    })
  },
  deleteOrder(e) {
    let that = this
    let orderId = e.currentTarget.dataset.id
    let tabIndex = e.currentTarget.dataset.tab
    util.openConfirm('提示', '确认删除该订单吗？', function () {
      util.showLoading()
      http.tokenPostRequest(url.deleteOrder, {
        oid: orderId,
        userid: app.globalData.user.id
      }, app.globalData.user.token).then(res => {
        console.log(res)
        if (res.data.returnCode == '200') {
          util.toast(res.data.msg)
          let newList = that.data.orderList[tabIndex].list.filter(v => v.id != orderId)
          that.setData({
            ['orderList[' + tabIndex + '].list']: newList,
            //['orderList['+ tabIndex +'].count']:that.data.orderList[tabIndex].count - 1
          })
        } else {
          throw res.data.msg
        }
      }).catch(res => {
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
      })
    })
  },
  goDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id=' + e.currentTarget.dataset.item.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.refresh_all()

    if(this.data.orderList[this.data.listIndex].isOnload){
      this.setData({
        ['orderList['+ this.data.listIndex +'].isOnload']:false
      })
      this.loadOrderByState(this.data.listIndex)
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})