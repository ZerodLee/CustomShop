// pages/search/search.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')

//const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      util.showLoading()
      http.getRequest(url.getHotSearch).then(res => {
          console.log(res)
          if (res.data.returnCode == '200') {
              that.setData({
                  hotwords: res.data.data2
              })
          }
      }).catch(res => {
          util.openAlert(res)
      }).finally(() => {
          util.hideLoading()
      })
      
  },
  showInput: function () {
    this.setData({
        inputShowed: true
    });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  },
  searchWord(e){
      let keyword = e.currentTarget.dataset.word?e.currentTarget.dataset.word:this.data.inputVal
      wx.navigateTo({
        url: '../homeCategories/homeCategories?keyword=' + keyword + '&title=搜索结果'
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