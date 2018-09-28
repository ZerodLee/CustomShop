// pages/proList/proList.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')

//const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:[],
    page:{limit:10,page:1,order:0},
    ctype:null,
    filterItems:[
      {order:0,name:'综合排序',selected:true},
      {order:1,name:'新品排序',selected:false},
      {order:2,name:'价格从高到低',selected:false},
      {order:3,name:'价格从低到高',selected:false},
    ],
    selectFilterItem:'综合排序',
    
    showFilter:false,
    showHighLevel:false,
    highLevelItems:{filter:[],hprice:'',lprice:'',selected:false}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let title = options.title ? options.title:'分类详情'
    let that = this
    wx.setNavigationBarTitle({
      title: title
    })
    if(!id){
      util.openAlert('没有当前分类信息！')
      return
    }else{
      this.setData({
        ctype:id
      })
    }
    let params = {ctype:id,limit:that.data.page.limit,order:that.data.order,page:that.data.page.page}
    that.loadList(params)
  },
  orderType(e){
    let that = this
    let order = e.currentTarget.dataset.order
    let params = {ctype:that.data.ctype,limit:that.data.page.limit,order:order,page:that.data.page.page}
    let filterItems = this.data.filterItems.map(item =>{
      if(item.order == order){
        item.selected = true
      }else{
        item.selected = false
      }
      return item
    })
    let selectFilterItem = filterItems.filter(v => v.selected)[0]
    this.setData({
      filterItems:filterItems,
      selectFilterItem:selectFilterItem.name,
      'page.order':order
    })
    this.loadList(params,that.filterPanel)
  },
  filterPanel(e,state){
    this.setData({
      showFilter:state == undefined?(!this.data.showFilter):state
    })
  },
  firstSales(e){
    let that = this
    let params = {ctype:that.data.ctype,limit:that.data.page.limit,order:4,page:that.data.page.page}
    this.loadList(params,that.closeFilter)
    this.setData({
      'page.order':4
    })
  },
  highLevelFilter(e,state){
    let that = this
    if(this.data.highLevelItems.filter.length == 0){
      util.showLoading()
      http.postRequest(url.getHighLevelItems,{cate_id:that.data.ctype}).then(res =>{
        console.log(res)
        if(res.data.returnCode == '200'){
          let filterItems = res.data.data2.map(item =>{
            item.selected = false
            return item
          })
          that.setData({
            'highLevelItems.filter':filterItems,
            showHighLevel:true
          })
        }
      }).catch(res =>{
        console.log(res)
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
        if(callback){
          callback()
        }
      })
    }else{
      this.setData({
        showHighLevel:state == undefined?(!this.data.showHighLevel):state
      })
    }
  },
  selectHighLevelItem(e){
    let index = 'highLevelItems.filter['+ e.currentTarget.dataset.index +'].selected'
    this.setData({
      [index]: !this.data.highLevelItems.filter[e.currentTarget.dataset.index].selected
    })
  },
  closeFilter(){
    this.filterPanel(null,false)
    this.highLevelFilter(null,false)
    return
  },
  loadList(params,callback){
    let that = this
    util.showLoading()
    http.postRequest(url.getProList,params).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        that.setData({
          proList:res.data.data2.list
        })
      }
    }).catch(res =>{
      console.log(res)
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
      if(callback){
        callback()
      }
    })
  },
  bindLowPrice(e){
    this.setData({
      'highLevelItems.lprice': e.detail.value
    })
  },
  bindHighPrice(e){
    this.setData({
      'highLevelItems.hprice': e.detail.value
    })
  },
  comfirmHighLevel(e){
    let cates = this.data.highLevelItems.filter.filter(v => v.selected)
    let cateId = cates.length>0?(cates[0]['id']):null
    let params = {
      ctype:this.data.ctype,cate_id:cateId,
      lprice:this.data.highLevelItems.lprice,
      hprice:this.data.highLevelItems.hprice,
      order:this.data.page.order,limit:this.data.page.limit,page:this.data.page.page
    }
    this.setData({
      'highLevelItems.selected':true
    })
    this.loadList(params,this.closeFilter)
  },
  resetHighLevel(e){
    let filterItems = this.data.highLevelItems.filter.map(item =>{
      item.selected = false
      return item
    })
    this.setData({
      highLevelItems: {filter:filterItems,lprice:'',hprice:'',selected:false}
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})