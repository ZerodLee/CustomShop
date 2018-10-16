// pages/history/history.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import { CountDown } from '../../utils/countdown'
const util = require('../../utils/util.js')

const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{limit:10,page:1,uid:0},
    listData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'params.uid':+app.globalData.user.id
    })
    this.loadData()
  },

  loadData(paramsObj,loadMore = false){
    let that = this
    let params = paramsObj?paramsObj:that.data.params
    util.showLoading()
    http.coustomRequest(url.getHistory,params,'POST','application/x-www-form-urlencoded',app.globalData.user.token).then(res =>{
      console.log('getHistory',res)
      if(res.data.returnCode == '200'){
        let listData = that.data.listData
        listData = [...listData,...res.data.data2.list]
        that.setData({
          listData:listData,
          count:res.data.data2.count
        })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  goDetail(e){
    wx.navigateTo({
      url: '../proDetail/proDetail?id=' + e.currentTarget.dataset.id
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
    if(this.data.count > this.data.listData.length){
      let params = this.data.params
      params.page = params.page + 1
      this.loadData(params)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})