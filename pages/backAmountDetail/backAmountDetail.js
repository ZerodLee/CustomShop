import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')
//const aes =  require('../../asset/js/aes')
const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:null,
    return_id:null,
    mrefund:null,
    reason:"",
    returnState:{3:'仅退款 退款中',5:'退款失败',6:'退款成功'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var return_id=options.id
    let that = this
    that.setData({
      return_id:return_id
    })
    http.tokenPostRequest(url.backAmountDetail,{id:return_id},app.globalData.user.token).then(res=>{
      console.log(res)
      if(res.data.returnCode=="200"){
        //util.toast("申请退款成功！")
        that.setData({
          order:res.data.data2
        })
      }
      else{
        throw res.data.msg
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
//撤销申请
  back_apply:function(e){
    let that = this
    http.tokenPostRequest(url.back_apply,{id:that.data.return_id},app.globalData.user.token).then(res=>{
      console.log(res)
      if(res.data.returnCode=="200"){
        util.toast("撤销申请成功！")
        setTimeout(function(){
          wx.navigateBack()
        },2000)
      }
      else{
        throw res.data.msg
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  bindMoney:function(e){
    var that=this
    var val=e.detail.value
    that.setData({
      mrefund:val
    })
  },
  bindReason:function(e){
    var that=this
    var val=e.detail.value
    that.setData({
      reason:encodeURIComponent(val)
    })
  },
  //修改申请！
  modify_return:function(e){
    let that = this
    var temp={
      content:that.data.reason,
      id:that.data.return_id,
      mrefund:that.data.mrefund,
      uid:app.globalData.user.id
    }
    if(!util.isHasValue(temp.mrefund)){
      util.toast("请填写退款金额！","none")
      return
    }
    if(!util.isHasValue(temp.content)){
      util.toast("请填写退款原因！","none")
      return
    }

    http.tokenPostRequest(url.modify_return,temp,app.globalData.user.token).then(res=>{
      console.log(res)
      if(res.data.returnCode=="200"){
        util.toast("修改申请成功！")
      }
      else{
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