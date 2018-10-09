// pages/mine/mine.js
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
    states:{topay:1,toShip:2,toSigning:3,toComment:4,all:5,},
    user:null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(app.globalData.user && wx.getStorageSync("openid")){
      // this.setData({
      //   user:app.globalData.user
      // })
    // }
  },

  goOrderList(e){
    //验证登录
    // if(!util.verifyLogin()){
    //   return false
    // }else{
    //   wx.navigateTo({
    //     url: '../orderList/orderList?state=' + e.currentTarget.dataset.state
    //   })
    // }
    wx.navigateTo({
      url: '../orderList/orderList?state=' + e.currentTarget.dataset.state
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      //this.goPersonalInfo(null,e.detail.userInfo)
    }
  },
  goHistory(e){
    wx.navigateTo({
      url: '../history/history'
    })
  },
  goPersonalInfo(e,params){
    //let paramsStr = params?JSON.stringify(params):''
    wx.navigateTo({
      url: '../signUp/signUp?params=' + JSON.stringify(this.data.user)
    })
  },
  getUserInfo(e){
    let that = this
    http.coustomRequest(url.getUserInfo,{},'GET','application/json',app.globalData.user.token).then(res =>{
      console.log('getUserInfo',res)
      if(res.data.returnCode == '200'){
        this.setData({
          user:res.data.data2
        })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
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
    // if(this.data.user.id != app.globalData.user.id){
    //   this.setData({
    //     user:app.globalData.user
    //   })
    // }
    this.getUserInfo()
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