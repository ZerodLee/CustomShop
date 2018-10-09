// pages/history/history.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import { CountDown } from '../../utils/countdown'
const util = require('../../utils/util.js')

const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{limit:10,page:1,uid:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'params.uid':+app.globalData.user.id
    })
    this.loadData()
  },

  loadData(paramsObj){
    let that = this
    let params = paramsObj?paramsObj:that.data.params
    util.showLoading()
    http.coustomRequest(url.getHistory,params,'POST','application/x-www-form-urlencoded',app.globalData.user.token).then(res =>{
      console.log('getHistory',res)
      if(res.data.returnCode == '200'){
        // that.setData({
        //   banner:res.data.data2
        // })
      }
    }).catch(res =>{
      console.log(res)
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