// pages/category/category.js
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
    topCategories:[],
    allCategories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    util.showLoading()
    //入口的图片
    http.getRequest(url.getThreeIcon).then(res =>{
      console.log('getThreeIcon',res)
      if(res.data.returnCode == '200'){
        that.setData({
          topCategories:res.data.data2
        })
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    })
    //分类页主数据
    http.getRequest(url.getAllCate).then(res =>{
      console.log('getAllCate',res)
      if(res.data.returnCode == '200'){
        that.setData({
          allCategories:res.data.data2
        })
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },

  goListDetail(e){
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../proList/proList?id=' + id + '&title=' + title
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