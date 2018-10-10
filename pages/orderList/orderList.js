// pages/orderList/orderList.js
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
    switchItems:{all:0,topay:1,toShip:2,toSigning:3,toComment:4},
    orderList:[{},{},{},{},{}],
    listIndex:0,
    pageParam:{userid:0,status:5,page:1,limit:10}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      'pageParam.userid':app.globalData.user.id
    })
    this.loadOrder(this.data.pageParam)
    console.log('options',options)
    this.switchTab(null,this.data.switchItems[options.state])
  },
  swiperChange(e){
    //console.log(e)
    this.setData({
      listIndex:e.detail.current
    })
  },
  switchTab(e,target){
    let index = target == undefined?e.currentTarget.dataset.index:target
    console.log(index)
    if(index != this.data.listIndex){
      this.setData({
        listIndex:index
      })
    }
    
  },
  loadOrder(params){
    let that = this
    util.showLoading()
    http.tokenPostRequest(url.getOrderlist,params,app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        // util.toast(res.data.msg,'none')
        // that.setData({
        //   orderInfo: res.data.data2,
        //   address:res.data.data2.addr_rs
        // })
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