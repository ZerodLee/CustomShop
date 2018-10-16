// pages/home/home.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import { CountDown } from '../../utils/countdown'
const util = require('../../utils/util.js')

//const app = getApp()
const http = new Http()
var timers
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 500,
    banner:[
      // '/asset/img/hone_banner.png',
      // '/asset/img/hone_banner.png',
      // '/asset/img/hone_banner.png'
    ],
    categories:[
      // {photo:'/asset/img/home_icon_tea.png',title:'都匀毛尖',id:'1'},
      // {photo:'/asset/img/home_icon_stqn.png',title:'生态黔南',id:'2'},
      // {photo:'/asset/img/home_icon_food.png',title:'绿色黔南',id:'3'},
      // {photo:'/asset/img/home_icon_mzgy.png',title:'民族工艺',id:'4'},
      // {photo:'/asset/img/home_icon_life.png',title:'爱尚生活',id:'5'},
      // {photo:'/asset/img/home_icon_jz.png',title:'家居建材',id:'6'},
      // {photo:'/asset/img/home_icon_fp.png',title:'扶贫专区',id:'7'},
      // {photo:'/asset/img/home_icon_more.png',title:'更多',id:'0'},
    ],
    timeLimitData:[{
      // discount:'1.0',
      // endtime:'1541001307',
      // title:'商品一 独家制作 官方直销 优惠多多',
      // photo:'https://www.qntv3h.com/out/upload/2018/08/21/15348470380799i4rru.jpg',
      // price:'57.98',
      // sales:'895',
      // thumb:'2018/08/21/thumbnail/15348470380799i4rru.jpg',
      // oldPrice:'60.00',
      // countdown:'2018-08-27 18:29:00'
    }],
    categoryBanner:{
      recHot:'/asset/img/home_title_city-wide.png',
      newPro:'/asset/img/home_title_new-product.png',
      findPro:'/asset/img/home_title_discovery.png',
      hotHouse:'/asset/img/home_title_house.png'
    },
    homeProList:{},
    listAds:[],
    lastAds:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    util.showLoading()
    http.getRequest(url.getBanner).then(res =>{
      console.log('bannner',res)
      if(res.data.returnCode == '200'){
        that.setData({
          banner:res.data.data2
        })
      }
      return http.getRequest(url.getCategories)
    }).then(res =>{
      console.log('category',res)
      if(res.data.returnCode == '200'){
        that.setData({
          categories:res.data.data2
        })
      }
      return http.getRequest(url.proLimitTime)
    }).then(res =>{
      console.log('limitTime',res)
      if(res.data.returnCode == '200'){
        let limitTime = []
        let timeLimitData = res.data.data2.map(v => {
          limitTime.push(+v.endtime)
          //v.limitTime = {hours:24,minutes:59,seconds:59}
          return v
        })
        that.setData({
          timeLimitData:timeLimitData
        })
        //console.log(limitTime)
        timers = that.startTimer(limitTime)
      }
      //开始加载所有首页商品
      //新品上架
      http.getRequest(url.newPro).then(res =>{
        console.log('newPro',res)
        if(res.data.returnCode == '200'){
          that.setData({
            'homeProList.newPro':res.data.data2
          })
        }
      })
      //发现好物
      http.getRequest(url.findPro).then(res =>{
        console.log('findPro',res)
        if(res.data.returnCode == '200'){
          that.setData({
            'homeProList.findPro':res.data.data2
          })
        }
      })
      //同城馆
      http.getRequest(url.recHot).then(res =>{
        console.log('recHot',res)
        if(res.data.returnCode == '200'){
          that.setData({
            'homeProList.recHot':res.data.data2
          })
        }
      })
      //热销房源
      http.getRequest(url.hotHouse).then(res =>{
        console.log('hotHouse',res)
        if(res.data.returnCode == '200'){
          that.setData({
            'homeProList.hotHouse':res.data.data2
          })
        }
      })
      //促销、同城、新品上架 banner
      http.getRequest(url.getCarouselAdvertise).then(res =>{
        console.log('getCarouselAdvertise',res)
        if(res.data.returnCode == '200'){
          that.setData({
            listAds:res.data.data2
          })
        }
      })
      //最下的三张图片
      http.getRequest(url.getFindAdvertise).then(res =>{
        console.log('getFindAdvertise',res)
        if(res.data.returnCode == '200'){
          that.setData({
            lastAds:res.data.data2
          })
        }
      })
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
      if(that.data.timeLimitData.length > 0){

      }
    })
  },

  goDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../proDetail/proDetail?id=' + e.currentTarget.dataset.id
    })
  },
  goCategory(e){
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    if(id == '4' || title == '生态黔南'){
      wx.navigateTo({
        url: '../articleList/articleList?id=' + 42 + '&title=' + title
      })
    }else if(id == '5' || title == '更多'){
      wx.switchTab({
        url: '../category/category'
      })
    }
    else{
      wx.navigateTo({
        url: '../proList/proList?id=' + id + '&title=' + title
      })
    }
  },
  homeCategories(e){
    wx.navigateTo({
      url: '../homeCategories/homeCategories?cate=' + e.currentTarget.dataset.cate + '&title=' + e.currentTarget.dataset.title
    })
  },
  goAds(e){
    console.log(e.currentTarget.dataset.ad)
    wx.navigateTo({
      url: '../proDetail/proDetail?id=' + e.currentTarget.dataset.ad.pid
    })
  },
  goHotHouse(e){
    console.log(this.data.homeProList.hotHouse,e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../webview/webview?url=' + url.getStqnDetailUrl + '&params=' + JSON.stringify({id:e.currentTarget.dataset.id})
    })
  },
  hotHouseList(e){
    wx.navigateTo({
      url: '../hotHouse/hotHouse'
    })
  },
  startTimer(limitTimes){
    let that = this
    let timeDown = new CountDown(0,limitTimes)

    let theTimer = setInterval(function(){
      let limitTime = timeDown.manyCountDown()
      //console.log(limitTime)
      let newTimeLimitData = that.data.timeLimitData.map((item,idx) =>{
        item.limitTime = limitTime[idx]
        return item
      })
      that.setData({
        timeLimitData:newTimeLimitData
      })
    },1000)
    return theTimer
  },
  stopTimer(){
    clearInterval(timers)
  },
  goSearch(){
    wx.navigateTo({
      url: '../search/search'
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
    this.stopTimer()
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