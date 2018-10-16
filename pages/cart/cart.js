// pages/cart/cart.js
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
    allCheck:false,
    cartList:[],
    count:0,
    cartInfo:{allPrice:'0.00',shopids:[]},

    isEdit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCart()
  },
  loadCart(){
    let that = this
    util.showLoading()
    //var files = res.tempFilePaths
    http.tokenPostRequest(url.getCart,{uid:app.globalData.user.id,limit:100,page:1,tmpid:url.tmpid},app.globalData.user.token).then(res =>{
      console.log('getCart',res)
      if(res.data.returnCode == '200'){
        let cartList = res.data.data2.list.map((v,idx) =>{
          v.index = idx
          v.isEdit = false
          return v
        })
        that.setData({
          cartList:cartList,
          count:res.data.data2.count
        })
        wx.setStorageSync('cart',{changed:false})
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  checkboxChange(e){
    console.log(e)
    let item = e.currentTarget.dataset.item
    let listIndex
    this.data.cartList.forEach((v,idx) => {
      if(v.id == item.id){
        listIndex = idx
        return false
      }
    })
    let listItem = 'cartList['+listIndex+'].checked'
    this.setData({
      [listItem]:!this.data.cartList[listIndex].checked
    })
    this.getCount()
  },
  allCheckChange(e){
    console.log(e)
    let allCheck = e.detail.value.length>0?true:false
    let newList = this.data.cartList.map((v,idx) => {
      v.checked = allCheck
      return v
    })
    this.setData({
      cartList:newList,
      allCheck:allCheck
    })
    this.getCount()
  },
  getCount(){
    let allPrice = 0
    let shopids = []
    this.data.cartList.forEach((v,idx) => {
      if(v.checked){
        allPrice += parseInt(v.proInfo.price)*parseInt(v.num)
        shopids.push(+v.id)
      }
    })
    console.log(allPrice.toFixed(2),shopids)
    this.setData({
      cartInfo:{allPrice:allPrice.toFixed(2),shopids:shopids},
    })
  },
  settleAccounts(){
    if(this.data.cartInfo.shopids.length == 0){
      util.toast('请选择需要下单的商品！','none')
      return false
    }
    let that = this
    util.showLoading()
    let orderParam = {uid:app.globalData.user.id}
    // for(let key in that.data.cartInfo.shopids){
      
    // }
    that.data.cartInfo.shopids.forEach((v,idx) =>{
      orderParam['shopids['+ idx +']'] = v
    })
    
    http.postRequest(url.comfirmBuy,orderParam).then(res =>{
      console.log('comfirmBuy',res)
      if(res.data.returnCode == '200'){
        // util.toast(res.data.msg,'none')
        wx.navigateTo({
          url: '../checkout/checkout?params=' + JSON.stringify(res.data.data2)+"&lijigoumai=0"
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
  editCart(e){
    let item = e.currentTarget.dataset.item
    item.isEdit = !item.isEdit
    this.setData({
      ['cartList['+ item.index +']']:item
    })

    // var that=this
    // var currentText=e.currentTarget.dataset.text
    // console.log(currentText)
    // console.log(e)
    // var thisItem=e.currentTarget.dataset.item
    // if(currentText=="编辑"){
    //   thisItem.isEdit=true
    // }
    // else if(currentText=="完成"){
    //   thisItem.isEdit=false
    // }
    // that.refresh_cartList(thisItem)
  },
  deleteItem(e){
    let that = this
    let item = e.currentTarget.dataset.item
    util.openConfirm('提示','是否从购物车删除该商品？',function(){
      util.showLoading()
      http.tokenPostRequest(url.deleteCartItem,{id:item.id,uid:app.globalData.user.id,tmpid:url.tmpid},app.globalData.user.token).then(res =>{
        console.log('deleteCartItem',res)
        if(res.data.returnCode == '200'){
          let cartList = that.data.cartList.filter(v => v.id != item.id)
          cartList.map((v,idx) => {
            v.index = idx
            return v
          })
          that.setData({
            cartList:cartList,
          })
          util.toast(res.data.msg)
        }
      }).catch(res =>{
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
      })
    })
  },
  editNumber(e){
    let that = this
    let item = e.currentTarget.dataset.item
    if(item.num == 1 && !e.currentTarget.dataset.add){
      util.toast('商品数量最小为1','none')
      return false
    }
    e.currentTarget.dataset.add?item.num++:item.num--

    util.showLoading()
    http.tokenPostRequest(url.editCartNumber,{id:item.id,num:item.num,uid:app.globalData.user.id,tmpid:url.tmpid},app.globalData.user.token).then(res =>{
      console.log('editCartNumber',res)
      if(res.data.returnCode == '200'){
        that.setData({
          ['cartList['+ item.index +']']:item,
        })
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  refresh_cartList(cartItem){
    var that=this
    for(var i=0;i<that.data.cartList.length;i++){
      var item=that.data.cartList[i]
      if(item.id==cartItem.id){
          that.data.cartList[i]=cartItem;
          that.setData({
            ["cartList["+i+"]"]:cartItem
          })
          break
      }
    }
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
    let cartChacnge = wx.getStorageSync('cart')
    if(cartChacnge && cartChacnge.changed){
      this.loadCart()
    }
    
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