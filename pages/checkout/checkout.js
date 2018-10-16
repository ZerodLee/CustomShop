// pages/checkout/checkout.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')
const aes =  require('../../asset/js/aes')
const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:null,
    orderInfo:null,
    orderParams:{addrid:0,is_jf:0,uid:0,buyer_remarks:''},
    lijigoumai:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let params = JSON.parse(options.params)
    if(!params){
      util.openAlert('商品参数错误！',function(){
        wx.navigateBack()
      })
      return false
    }else{
      params.price_all = params.price_all?params.price_all.toFixed(2):params.price.toFixed(2)
      that.setData({
        orderInfo: params,
        address:params.addr_rs,
        lijigoumai:options.lijigoumai
      })
    }
    // util.showLoading()
    // http.postRequest(url.justBuy,params).then(res =>{
    //   console.log(res)
    //   if(res.data.returnCode == '200'){
    //     // util.toast(res.data.msg,'none')
    //     that.setData({
    //       orderInfo: res.data.data2,
    //       address:res.data.data2.addr_rs
    //     })
    //   }
    // }).catch(res =>{
    //   util.openAlert(res)
    // }).finally(() => {
    //   util.hideLoading()
    // })
  },
  selectAddress(e){
    wx.navigateTo({
      url: '../addressList/addressList'
    })
  },
  switchChange(e){
    console.log(e)
    this.setData({
      'orderParams.is_jf':e.detail.value?1:0
    })
  },
  bindRemarkInput(e){
    this.setData({
      'orderParams.buyer_remarks':e.detail.value
    })
  },
  submitOrder(e){
    let that = this
    let params = this.data.orderParams
    let product = this.data.orderInfo.shopdata[0]

    let theUrl = ''


    params.addrid = +this.data.address.id
    params.uid = app.globalData.user.id
    params.buyer_remarks = encodeURIComponent(params.buyer_remarks)

    if(!params.uid){
      util.toast('请重新登录！','none')
      return false
    }else if(!params.addrid){
      util.toast('请收货地址！','none')
      return false
    }
    //立即购买逻辑
    if(that.data.lijigoumai=="1"){
      params.attrid1 = +product.attrid1
      params.attrid2 = +product.attrid2
      params.num = +product.num
      params.pid = +product.pid

      theUrl = url.submitOrderNow
    }
    //从购物车过来的购买逻辑！
    else if(that.data.lijigoumai=="0"){
      that.data.orderInfo.shopdata.forEach((v,idx) => {
        params['shopids['+ idx +']'] = v.id
      })
      theUrl = url.submitOrder
    }
    console.log(params)
    util.showLoading()
    http.postRequest(theUrl,params).then(res =>{
      if(res.data.returnCode == '200'){
        let orderId = +aes.Decrypt(res.data.data)
        console.log(orderId)
        wx.setStorageSync('cart',{changed:true})
        return http.postRequest(url.getPayParam,{id:orderId,type:2,uid:app.globalData.user.id,trade_type:'JSAPI'})
      }else{
        throw res.data.msg
      }
    }).then(res =>{
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let address = wx.getStorageSync('defaultAddress')
    if(address){
      console.log('defaultAddress',address)
      this.setData({
        address:address
      })
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