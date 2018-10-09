// pages/cart/cart.js
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
    allCheck:false,
    cartList:[],
    count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCart()
  },
  loadCart(){
    let that = this
    util.showLoading()
    //var files = res.tempFilePaths
    http.postRequest(url.getCart,{uid:app.globalData.user.id,limit:100,page:1,tmpid:url.tmpid}).then(res =>{
      console.log('getCart',res)
      if(res.data.returnCode == '200'){
        that.setData({
          cartList:res.data.data2.list,
          count:res.data.data2.count
        })
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  checkboxChange(e){
    console.log(e)
    this.setData({
      allCheck:!this.data.allCheck
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