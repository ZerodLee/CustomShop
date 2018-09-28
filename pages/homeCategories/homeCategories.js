// pages/proList/proList.js
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
    let cate = options.cate
    let title = options.title ? options.title:'分类详情'
    let that = this
    let params = cate?{[cate]:1,limit:that.data.page.limit,page:that.data.page.page}:{limit:that.data.page.limit,page:that.data.page.page}
    wx.setNavigationBarTitle({
      title: title
    })
    http.postRequest(url.getProList,params).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        that.setData({
          proList:res.data.data2.list
        })
      }
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