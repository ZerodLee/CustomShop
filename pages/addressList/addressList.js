// pages/addressList/addressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[{
      name:'王佳浩',phone:'1234435345',address:'湖北省武汉市洪山区光谷天地',id:12
    },{
      name:'刘栋',phone:'1346657677',address:'湖北省武汉市江夏区藏龙岛',id:19
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //加载地址用onshow
  },
  radioChange(e){
    console.log(e)
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
  loadAddress(){},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.loadAddress()
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