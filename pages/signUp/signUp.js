// pages/signUp/signUp.js
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
    userInfo:null,
    gender:['女','男'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = JSON.parse(options.params)
    console.log(userInfo)
    userInfo.gender = userInfo.gender?+userInfo.gender:0
    this.setData({
      userInfo:userInfo
    })
  },
  bindName(e){
    console.log(e)
    let that = this
    let params = {id:app.globalData.user.id,nickname:e.detail.value}
    http.tokenPostRequest(url.changeName,params,app.globalData.user.token).then(res =>{
      console.log('changeName',res)
      if(res.data.returnCode == '200'){
        util.toast('修改成功')
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      util.openAlert(res)
    })
  },
  getAvatar(e){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
          util.showLoading('图片上传中...')
          //var files = res.tempFilePaths
          http.uploadFile(url.uploadFile,res.tempFilePaths[0],{id:app.globalData.user.id},app.globalData.user.token).then(res =>{
            
            var reslut = JSON.parse(res.data)
            console.log('uploadFile',reslut)
            if(reslut.returnCode == '200'){
              util.toast(reslut.msg)
              that.setData({
                'userInfo.pic_head':reslut.data2
              })
            }
          }).catch(res =>{
            util.openAlert(res)
          }).finally(() => {
            util.hideLoading()
          })
      }
  })
  },
  bindPhone(e){
    wx.navigateTo({
      url: '../login/login'
    })
  },
  bindGender: function(e) {
    let that = this
    let params = {id:app.globalData.user.id,gender:e.detail.value}
    http.tokenPostRequest(url.changeGender,params,app.globalData.user.token).then(res =>{
      console.log('changeGender',res)
      if(res.data.returnCode == '200'){
        that.setData({
          'userInfo.gender':e.detail.value
        })
        util.toast('修改成功')
      }
    }).catch(res =>{
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