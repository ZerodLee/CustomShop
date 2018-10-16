// pages/webview/webview.js
// import { Http } from '../../utils/http'
// import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')

// const app = getApp()
// const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let url = options.url
    let params = options.params?JSON.parse(options.params):''
    if(url){
      // wx.setNavigationBarTitle({
      //   title: item[0].title
      // })
      let idx = 0
      if(params){
        for(let key in params){
          if(idx == 0){
            url += '?' + key + '=' + params[key]
          }else{
            url += '&' + key + '=' + params[key]
          }
          idx++
        }
        console.log(url)
      }
      this.setData({
        url:url
      })
    }else{
      util.openAlert('获取地址失败！')
    }
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