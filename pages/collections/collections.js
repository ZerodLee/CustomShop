// pages/collections/collections.js
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
    page:{limit:10,page:1,uid:0},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      'page.uid':app.globalData.user.id
    })
    http.tokenPostRequest(url.getCollection,this.data.page,app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        that.setData({
          proList:res.data.data2.list,
          'page.count':res.data.data2.count
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
  goDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../proDetail/proDetail?id=' + e.currentTarget.dataset.id
    })
  },
  loadMore(){
    let that = this
    if(that.data.page.count > that.data.proList.length && that.data.page.count > 10){
      let params = that.data.page
      params.page = params.page+ 1
      http.tokenPostRequest(url.getCollection,params,app.globalData.user.token).then(res =>{
        console.log(res)
        if(res.data.returnCode == '200'){
          let proList = [...that.data.proList,...res.data.data2.list]
          that.setData({
            proList:proList,
            'page.count':res.data.data2.count
          })
        }
      })
    }
  },
  delete(e){
    let that = this
    let pid = e.currentTarget.dataset.id
    util.openConfirm('提示','确定删除该商品的收藏吗？',function(){

      util.showLoading()
      http.tokenPostRequest(url.collection,{proid:pid,uid:app.globalData.user.id},app.globalData.user.token).then(res =>{
        console.log(res)
        if(res.data.returnCode == '200'){
          util.toast(res.data.msg)
          let newList = that.data.proList.filter(v => v.pid != pid)
          that.setData({
            proList: newList
          })
        }
      }).catch(res =>{
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
      })
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})