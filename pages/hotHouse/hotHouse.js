// pages/hotHouse/hotHouse.js
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
    hotHouse:{spot:[],futures:[],stores:[]},
    showtype:3, //3,4,5
    typeItems:['','','','spot','futures','stores']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.switchType(null,3)
  },

  switchType:function(e,typeid,pageindex = 1,pagesize = 10){
    var that=this
    util.showLoading()
    let type = typeid?typeid:e.currentTarget.dataset.type
    http.postRequest(url.getHotHouse,{limit:pagesize,page:pageindex,type:type}).then(res=>{
      console.log(res)
      if(res.data.returnCode=="200"){
          that.setData({
            ['hotHouse.'+ that.data.typeItems[typeid]]:res.data.data2.list,
            showtype:type,
          })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  goArticle(e){
    wx.navigateTo({
      url: '../webview/webview?url=' + url.getStqnDetailUrl + '&params=' + JSON.stringify({id:e.currentTarget.dataset.id})
    })
  },
  goReserve(e){
    wx.navigateTo({
      url: '../houseReserve/houseReserve?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name
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