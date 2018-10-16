// pages/houseReserve/houseReserve.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import { CountDown } from '../../utils/countdown'
const util = require('../../utils/util.js')

//const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    param:{rname:'',tel:'',content:'',pid:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pid = options.id
    let title = options.name
    this.setData({
      title:title,
      'param.pid':pid
    })
  },
  bindName(e){
    this.setData({
      'param.rname':e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      'param.tel':e.detail.value
    })
  },
  bindRemark(e){
    this.setData({
      'param.content':e.detail.value
    })
  },
  submit(){
    let that = this
    let param = this.data.param
    console.log(param)
    if(!util.isHasValue(param.rname)){
      util.toast("请填写预定人姓名！",'none')
      return false
    }else{
      param.rname = encodeURIComponent(param.rname)
    }
    if(!util.isPhoneAvailable(param.tel)){
      util.toast("请填写正确手机号码！",'none')
      return false
    }else{
      param.content = encodeURIComponent(param.content)
    }

    util.showLoading()
    http.postRequest(url.submitReserve,param).then(res=>{
      console.log(res)
      if(res.data.returnCode=="200"){
          util.toast(res.data.msg)
          setTimeout(() => {
            wx.navigateBack()
          }, 2000);
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
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