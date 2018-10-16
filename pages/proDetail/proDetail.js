// pages/proDetail/proDetail.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import regeneratorRuntime from '../../asset/js/runtime' //使用es2017 async函数的引用
import { CountDown } from '../../utils/countdown'
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse')
const app = getApp()
const http = new Http()
var timer
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
    comments:{showImage:false}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let proid = options.id || 217
    let that = this
    util.showLoading()
    http.postRequest(url.getProDetail,{pid:proid,tmpid:865376036149522,uid:app.globalData.user.id}).then(res =>{
      console.log('detail',res)
      if(res.data.returnCode == '200'){
        wx.setNavigationBarTitle({
          title: res.data.data2.detail.title
        })
        that.setData({
          detail:res.data.data2.detail,
          product:res.data.data2,
          selectedObj:{attrid1:0,attrid2:0,num:1,pid:+proid,tmpid:url.tmpid,uid:app.globalData.user.id}
        })
        if(that.data.detail.endtime){
          timer = that.startCountDown(+that.data.detail.endtime)
        }
        res.data.data2.detail.contentmob = res.data.data2.detail.contentmob.replace(/<style.*<\/style>/gi,'' );

        //res.data.data2.detail.contentmob = that.convertHtmlToText(res.data.data2.detail.contentmob);
        //res.data.data2.detail.contentmob = res.data.data2.detail.contentmob.replace(/\*.*\}/, '');
        // res.data.data2.detail.contentmob = res.data.data2.detail.contentmob.replace(/\<img/gi,'<img style="max-width:100%;height:auto" class="rich-img" ' );
        var article = res.data.data2.detail.contentmob;
        WxParse.wxParse('article', 'html', article, that, 0);
        
      }else if(res.data){
        throw res.data.msg
      }
    //   return http.postRequest(url.getComments,{proid:proid,image:0,page:1,limit:10})
    // }).then(res => {
    //   console.log('comments.all',res)
    //   if(res.data.returnCode == '200'){
    //     res.data.data2.list = res.data.data2.list.map(v =>{
    //       v.time = util.formatTime(new Date(v.timeline*1000))
    //       return v
    //     })
    //     that.setData({
    //       'comments.all':res.data.data2,
    //       'comments.allPage':{proid:proid,image:0,page:1,limit:10}
    //     })
    //     return http.postRequest(url.getComments,{proid:proid,image:1,page:1,limit:10})
    //   }else{
    //     throw res.data.msg
    //   }
    // }).then(res => {
    //   console.log('comments.images',res)
    //   if(res.data.returnCode == '200'){
    //     res.data.data2.list = res.data.data2.list.map(v =>{
    //       v.time = util.formatTime(new Date(v.timeline*1000))
    //       return v
    //     })
    //     that.setData({
    //       'comments.images':res.data.data2,
    //       'comments.imagePage':{proid:proid,image:1,page:1,limit:10}
    //     })
    //   }else{
    //     throw res.data.msg
    //   }
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
      setTimeout(resolve, 300);
    })
    wx.createSelectorQuery().select(selector).fields({size: true}, function(res) {
      console.log('selector-info',res)
      height = res.height
      if(callback){
        callback(height)
      }
    }).exec()
    //return height
  },
  swiperChange(index){
    //console.log(e)
    let that = this
    this.setData({
      detailIndex:index
    })
    if(index == 1){
      util.showLoading()
      http.postRequest(url.getComments,{proid:that.data.selectedObj.pid,image:0,page:1,limit:10}).then(res => {
      console.log('comments.all',res)
      if(res.data.returnCode == '200'){
        res.data.data2.list = res.data.data2.list.map(v =>{
          v.time = util.formatTime(new Date(v.timeline*1000))
          return v
        })
        that.setData({
          'comments.all':res.data.data2,
          'comments.allPage':{proid:that.data.selectedObj.pid,image:0,page:1,limit:10}
        })
        return http.postRequest(url.getComments,{proid:that.data.selectedObj.pid,image:1,page:1,limit:10})
      }else{
        throw res.data.msg
      }
    }).then(res => {
      console.log('comments.images',res)
      if(res.data.returnCode == '200'){
        res.data.data2.list = res.data.data2.list.map(v =>{
          v.time = util.formatTime(new Date(v.timeline*1000))
          return v
        })
        that.setData({
          'comments.images':res.data.data2,
          'comments.imagePage':{proid:that.data.selectedObj.pid,image:1,page:1,limit:10}
        })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
      //that.changeDetailHeight(index)
    })
  }
    //this.changeDetailHeight(e.detail.current)
  },
  switchTab(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    if(index != this.data.detailIndex){
      this.setData({
        detailIndex:index
      })
    }
    this.swiperChange(index)
  },
  //选规格
  chooseSpec(e){
    var that=this
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let attrKey = 'selectedObj.attrid' + (index+1)
    let selectSpec = 'product.attr[' + index + '].er'
    console.log(item,attrKey)

    console.log(that.data.product.allsize)
    let newSpecs = this.data.product.attr[index]['er'].map(v=> {
      if(v.id == item.id){
        v.selected = true
      }else{
        v.selected = false
      }
      return v
    })
    this.setData({
      //selected:item,
      //'selectedObj.attrid1':+item.attrid1,
      [selectSpec]:newSpecs,
      [attrKey]:item.id
    })
    let attrid1 = that.data.selectedObj.attrid1
    let attrid2 = that.data.selectedObj.attrid2
    if((attrid1 && attrid2) || that.data.product.attr.length == 1){
      let attrItem = that.data.product.allsize.filter(v => (v.attrid1 == attrid1 && v.attrid2 == attrid2))[0]
      that.setData({
        selected:attrItem
      })
    }
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
    if((that.data.product.attr.length == 1 && params.attrid1) || (that.data.product.attr.length == 2 && params.attrid1 && params.attrid2)){
      util.showLoading()
      http.postRequest(url.justBuy,params).then(res =>{
        console.log(res)
        if(res.data.returnCode == '200'){
          // util.toast(res.data.msg,'none')
          wx.navigateTo({
            url: '../checkout/checkout?params=' + JSON.stringify(res.data.data2)+"&lijigoumai=1"
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
  goto_kefu(e){
    var obj={
      companyID:"832737",
      configID:"151567",
      jid:"3499241294",
      hidebtn:"1",
      s:"1"
    }
    wx.navigateTo({
      //https://chat8.live800.com/live800/chatClient/chatbox.jsp?companyID=832737&configID=151567&jid=3499241294&hidebtn=1&s=1

      url:"../webview/webview?url="+encodeURIComponent("https://chat8.live800.com/live800/chatClient/chatbox.jsp")+"&params="+JSON.stringify(obj)
    })
  },
  //去购物车
  goCart(e){
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  startCountDown(endtime){
    let that = this
    let timeDown = new CountDown(endtime)

    let theTimer = setInterval(function(){
      let limitTime = timeDown.singleCountDown()
      //console.log(limitTime)
      that.setData({
        'detail.limitTime':limitTime
      })
    },1000)
    return theTimer
  },
  stopCountDown(){
    clearInterval(timer)
  },
  switchShowImage(e){
    this.setData({
      'comments.showImage':e.currentTarget.dataset.image
    })
  },
  loadMoreComments(e){
    let that = this
    let params = e.currentTarget.dataset.image?this.data.comments.imagePage:this.data.comments.allPage
    params.page = params.page + 1
    util.showLoading()
    http.postRequest(url.getComments,params).then(res => {
      if(res.data.returnCode == '200'){
        res.data.data2.list = res.data.data2.list.map(v =>{
          v.time = util.formatTime(new Date(v.timeline*1000))
          return v
        })
        let commentsList = e.currentTarget.dataset.image?that.data.comments.images.list:that.data.comments.all.list
        let indexStr = e.currentTarget.dataset.image?'comments.images.list':'comments.all.list'
        commentsList = [...commentsList,...res.data.data2.list]
        that.setData({
          [indexStr]:commentsList,
          'comments.imagePage':params
        })
      }else{
        throw res.data.msg
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
      that.changeDetailHeight()
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
    console.log('onUnload')
    this.stopCountDown()
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