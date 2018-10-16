// pages/orderDetail/orderDetail.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')
//const aes =  require('../../asset/js/aes')
const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStates:['无','待付款','待发货','待收货','待评价','订单取消','交易关闭','交易完成','售后中'],
    orderIcon:['','icon-zhuyishixiang_f','icon-guanbi'],
    orderTips:['','等待买家付款','买家已付款，等待卖家发货','待收货','待评价','订单取消','交易关闭','交易完成','售后中'],
    orderId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let orderId = options.id 
    that.setData({
      orderId:orderId
    })
    
  },

  load_data:function(){
    var that=this
    var _orderid=that.data.orderId
    http.tokenPostRequest(url.getOrderDetail,{id:_orderid,userid:app.globalData.user.id},app.globalData.user.token).then(res =>{
      console.log(res.data.data2)
      if(res.data.returnCode == '200'){
        res.data.data2.time = util.formatTime(new Date(res.data.data2.timeline*1000))
        that.setData({
          order:res.data.data2
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

  getBackAmount(e){
    var that=this
    var product=e.currentTarget.dataset.item
    var obj={
      attrid1:product.attrid1,
      attrid2:product.attrid2,
      ctype:1,
      id:that.data.order.id,
      pid:product.id,
      uid:app.globalData.user.id
    }
    wx.navigateTo({
      url: '../backAmount/backAmount?obj='+JSON.stringify(obj) //+ e.currentTarget.dataset.id
    })
  },

  backAmountDetail(e){
    var item=e.currentTarget.dataset.item
    wx.navigateTo({
      url:"../backAmountDetail/backAmountDetail?id="+item.returnid
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
    this.load_data()
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