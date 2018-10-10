// pages/addAddress/addAddress.js
import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'
import { cities } from '../../asset/js/province'

const util = require('../../utils/util.js')

const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    inputs:{username:'',tel:'',addr:'',is_default:0,city:0,province:0},
    addressId:null,
    edit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(cities)
    let params = JSON.parse(options.params)
    if(params){
      console.log('edit')
      this.setData({
        'inputs.username':params.username,
        'inputs.tel':params.tel,
        'inputs.addr':params.addr,
        'inputs.is_default':params.is_default,
        'inputs.id':params.id,
        region:[params.province_name,params.city_name,''],
        edit:true
      })
    }
  },
  bindPerson(e){
    this.setData({
      'inputs.username':e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      'inputs.tel':e.detail.value
    })
  },
  bindAdddress(e){
    this.setData({
      'inputs.addr':e.detail.value
    })
  },
  bindRegionChange: function (e){
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  addAddress(e){
    let params = this.data.inputs
    let that = this
    console.log(params)
    if(!params.username){
      util.toast('请填写收货人！','none')
      return
    }else if(!util.isPhoneAvailable(params.tel)){
      util.toast('请填写正确的手机号！','none')
      return
    }else if(!params.addr){
      util.toast('请填写详细地址！','none')
      return
    }else if(!that.data.region[0] || !that.data.region[1]){
      util.toast('请选择省市地区！','none')
      return
    }
    let cityObj = that.cityTONumber(that.data.region)
    let theUrl = that.data.edit?url.editAddress:url.addAddress
    params.province =  cityObj.province
    params.city =  cityObj.city

    util.showLoading()
    http.tokenPostRequest(theUrl,params,app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode == '200'){
        util.toast(res.data.msg)
        setTimeout(() => {
          wx.navigateBack()
        }, 2000);
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
  },
  cityTONumber(cityArr){
    let province = cities.filter(v => v.title == cityArr[0])[0]
    let city = province.er.filter(v => v.title == cityArr[1])[0]
    console.log(province.title,city.title)
    return {province:province.yid,city:city.yid}
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