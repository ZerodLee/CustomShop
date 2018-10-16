import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')
//const aes =  require('../../asset/js/aes')
const app = getApp()
const http = new Http()

// pages/backAmount/backAmount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var temp=JSON.parse(options.obj)
    console.log(temp)

    that.setData({
      obj:temp
    })    
  },
  bindMoney:function(e){
    var that=this
    var val=e.detail.value
    that.setData({
      "obj.mrefund":val
    })
  },
  bindReason:function(e){
    var that=this
    var val=e.detail.value
    that.setData({
      "obj.content":encodeURIComponent(val)
    })
  },

  submit_back_amount:function(){
    var that=this
    if(!util.isHasValue(that.data.obj.mrefund)){
      util.toast("请填写退款金额！","none")
      return
    }
    if(!util.isHasValue(that.data.obj.content)){
      util.toast("请填写退款原因！","none")
      return
    }

    http.tokenPostRequest(url.backAmount,that.data.obj,app.globalData.user.token).then(res=>{
      console.log(res)
      if(res.data.returnCode=="200"){
        util.toast("申请退款成功！")
        wx.navigateBack()
      }
      else{
        util.toast("申请退款失败！")
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