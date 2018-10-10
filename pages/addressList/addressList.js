// pages/addressList/addressList.js
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
    addressList:[
      //   {
      //   name:'王佳浩',phone:'1234435345',address:'湖北省武汉市洪山区光谷天地',id:12
      // },{
      //   name:'刘栋',phone:'1346657677',address:'湖北省武汉市江夏区藏龙岛',id:19
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //加载地址用onshow
  },
  radioChange(e){
    console.log(e)
    let that = this
    util.showLoading()
    http.tokenPostRequest(url.defaultAddress,{id:e.detail.value,is_default:1},app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        util.toast(res.data.msg)
        // that.setData({
        //   addressList: res.data.data2
        // })
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  chooseAddress(e){
    let address = e.currentTarget.dataset.item
    if(address){
      wx.setStorageSync('defaultAddress', address)
      wx.navigateBack()
    }
  },
  addAddress(e){
    wx.navigateTo({
      url: '../addAddress/addAddress'
    })
  },
  editAdd(e){
    wx.navigateTo({
      url: '../addAddress/addAddress?params=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  deleteAdd(e){
    let that = this
    let addressId = e.currentTarget.dataset.id
    util.openConfirm('提示','确定删除该地址吗？',function(){
      util.showLoading()
      http.tokenPostRequest(url.deleteAddress,{id:addressId},app.globalData.user.token).then(res =>{
        console.log(res)
        if(res.data.returnCode == '200'){
          util.toast(res.data.msg)
          that.loadAddress()
        }
      }).catch(res =>{
        util.openAlert(res)
      }).finally(() => {
        util.hideLoading()
      })
    })
  },
  loadAddress(){
    let that = this
    util.showLoading()
    http.tokenPostRequest(url.getAddress,{},app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        // util.toast(res.data.msg,'none')
        that.setData({
          addressList: res.data.data2
        })
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
    this.loadAddress()
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