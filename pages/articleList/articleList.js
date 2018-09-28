// pages/articleList/articleList.js
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
    proList:[],
    page:{limit:10,page:1}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let title = options.title ? options.title:'文章列表'
    let that = this
    if(!id){
      util.openAlert('没有当前文章列表信息！')
      return
    }
    wx.setNavigationBarTitle({
      title: title
    })
    http.postRequest(url.getStqnList,{ctype:id,limit:that.data.page.limit,page:that.data.page.page}).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        that.setData({
          proList:res.data.data2.list
        })
      }
    })
  },
  goArticle(e){
    wx.navigateTo({
      url: '../webview/webview?url=' + url.getStqnDetail + '&params=' + JSON.stringify({id:e.currentTarget.dataset.id})
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