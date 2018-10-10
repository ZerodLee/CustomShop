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
    product:{},
    swiperHeight:500,
    detailIndex:0,

    selected:null,
    //提交参数
    selectedObj:null,

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
          detail:res.data.data2.detail,
          product:res.data.data2,
          selectedObj:{attrid1:0,num:1,pid:+proid,tmpid:url.tmpid,uid:app.globalData.user.id}
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
  //选规格
  chooseSpec(e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    let newSpecs = this.data.product.allsize.map(v=> {
      if(v.attrid1 == item.attrid1){
        v.selected = true
      }else{
        v.selected = false
      }
      return v
    })
    this.setData({
      selected:item,
      'selectedObj.attrid1':+item.attrid1,
      'product.allsize':newSpecs
    })
  },
  //加减数量
  changeCount(e){
    let state = e.currentTarget.dataset.state
    let num = this.data.selectedObj.num
    num = (state == 'add')?(num+1):(num-1)
    if(num == 0){
      util.toast('数量不得小于1','none')
      return
    }else{
      this.setData({
        'selectedObj.num':num
      })
    }
  },
  //加入购物车
  addCart(e){
    let that = this
    let params = this.data.selectedObj
    console.log(params)
    if(params && params.attrid1){}else{
      if(this.data.showSpec){
        util.toast('请选择规格！','none')
        return false
      }else{
        this.switchSpec(true)
      }
    }
    util.showLoading()
    http.tokenPostRequest(url.addCart,params,app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        util.toast(res.data.msg)

        wx.setStorageSync('cart',{changed:true})
        that.setData({
          'product.shopcart_number': that.data.product.shopcart_number + params.num
        })
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  //立即购买
  justBuy(e){
    let that = this
    let params = this.data.selectedObj
    console.log(params)
    if(params && params.attrid1){
      util.showLoading()
      http.postRequest(url.justBuy,params).then(res =>{
        console.log(res)
        if(res.data.returnCode == '200'){
          // util.toast(res.data.msg,'none')
          wx.navigateTo({
            url: '../checkout/checkout?params=' + JSON.stringify(res.data.data2)
          })
        }else{
          throw res.data.msg
        }
      }).catch(res =>{
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
      })
      
    }else{
      if(this.data.showSpec){
        util.toast('请选择规格！','none')
        return false
      }else{
        this.switchSpec(true)
      }
    }
  },
  //打开关闭规格选项
  switchSpec(state){
    let show = state == undefined?!this.data.showSpec:state
    this.setData({
      showSpec:show
    })
  },
  closeSpec(){
    this.switchSpec(false)
  },
  //收藏
  collect(e){
    let that = this
    let params = this.data.selectedObj
    util.showLoading()
    http.tokenPostRequest(url.collection,{proid:params.pid,uid:params.uid},app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        util.toast(res.data.msg)
        that.setData({
          'product.is_collection': (res.data.data2?1:0)
        })
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  //去购物车
  goCart(e){
    wx.switchTab({
      url: '../cart/cart'
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