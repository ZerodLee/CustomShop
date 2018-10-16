// pages/afterSale/afterSale.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
const util = require('../../utils/util.js')

const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:{limit:10,page:1},
    returnOrder:null,
    returnState:{3:'仅退款 退款中',5:'退款失败',6:'退款成功'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let param = {limit:that.data.page.limit,page:that.data.page.page,uid:app.globalData.user.id}
    util.showLoading()
    http.tokenPostRequest(url.afterSale,param,app.globalData.user.token).then(res =>{
      console.log('afterSale',res)
      if(res.data.returnCode == '200'){
        let orderList = res.data.data2.list.map(v => {
          v.time = util.formatTime(new Date(v.timeline * 1000))
          //v.state = that.data.orderStates[v.status]
          return v
        })
        this.setData({
          'returnOrder.list':orderList,
          'returnOrder.count':res.data.data2.count,
        })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  goDetail(e){
    wx.navigateTo({
      url: '../backAmountDetail/backAmountDetail?id=' + e.currentTarget.dataset.item.id
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