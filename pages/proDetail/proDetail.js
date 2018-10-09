// pages/proDetail/proDetail.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import regeneratorRuntime from '../../asset/js/runtime' //使用es2017 async函数的引用

const util = require('../../utils/util.js')

const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 500,
    proImg:[{photo:'/asset/img/pro.png'}],
    detail:{},
    swiperHeight:500,
    detailIndex:0,

    selected:{attrid1:0,num:0,pid:0,tmpid:url.tmpid,uid:0},

    cartNumber:0,
    showSpec:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let proid = options.id || 217
    let that = this
    util.showLoading()
    http.postRequest(url.getProDetail,{pid:proid,tmpid:865376036149522}).then(res =>{
      console.log('detail',res)
      if(res.data.returnCode == '200'){
        res.data.data2.detail.contentmob = res.data.data2.detail.contentmob.replace(/\<img/gi,'<img style="max-width:100%;height:auto" class="rich-img" ' );
        that.setData({
          detail:res.data.data2.detail
        })
        wx.setNavigationBarTitle({
          title: res.data.data2.detail.title
        })
      }else if(res.data){
        throw res.data.msg
      }
      return http.getRequest(url.getCartNumber)
    }).then(res => {
      console.log('cart',res)
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
      that.changeDetailHeight()
    })

    
  },
  changeDetailHeight(index = 0) {
    let that = this
    let selector = index == 0?'.detail-content':'.issue'
    that.getDomHeight(selector,function(height){
      //console.log(that,height)
      that.setData({
        swiperHeight:height
      })
    })
  },
  async getDomHeight(selector = '.page',callback){
    let height = 0
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    })
    wx.createSelectorQuery().select(selector).fields({size: true}, function(res) {
      console.log('selector-info',res)
      height = res.height
      if(callback){
        callback(height)
      }
    }).exec()
    return height
  },
  swiperChange(e){
    //console.log(e)
    this.setData({
      detailIndex:e.detail.current
    })
    this.changeDetailHeight(e.detail.current)
  },
  switchTab(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    if(index != this.data.detailIndex){
      this.setData({
        detailIndex:index
      })
    }
    
  },
  addCart(e){
    this.setData({
      showSpec:!this.data.showSpec
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