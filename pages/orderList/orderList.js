// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchItems:{all:0,topay:1,toShip:2,toSigning:3,toComment:4},
    orderList:[{},{},{},{},{}],
    listIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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