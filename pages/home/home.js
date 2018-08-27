// pages/home/home.js
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
      '/asset/img/hone_banner.png',
      '/asset/img/hone_banner.png',
      '/asset/img/hone_banner.png'
    ],
    categories:[
      {iconPath:'/asset/img/home_icon_tea.png',text:'都匀毛尖',id:'1'},
      {iconPath:'/asset/img/home_icon_stqn.png',text:'生态黔南',id:'2'},
      {iconPath:'/asset/img/home_icon_food.png',text:'绿色黔南',id:'3'},
      {iconPath:'/asset/img/home_icon_mzgy.png',text:'民族工艺',id:'4'},
      {iconPath:'/asset/img/home_icon_life.png',text:'爱尚生活',id:'5'},
      {iconPath:'/asset/img/home_icon_jz.png',text:'家居建材',id:'6'},
      {iconPath:'/asset/img/home_icon_fp.png',text:'扶贫专区',id:'7'},
      {iconPath:'/asset/img/home_icon_more.png',text:'更多',id:'0'},
    ],
    timeLimitData:[
      {imgPath:'/asset/img/product.png',title:'商品一 独家制作 官方直销 优惠多多',price:'57.98',oldPrice:'60.00',countdown:'2018-08-27 18:29:00'},
      {imgPath:'/asset/img/product.png',title:'商品二 配方一流 官方直销 优惠多多',price:'37.98',oldPrice:'40.00',countdown:'2018-08-29 16:20:00'},
      {imgPath:'/asset/img/product.png',title:'商品三 绝味 官方直销 优惠多多',price:'45.98',oldPrice:'65.00',countdown:'2018-08-28 10:29:00'},
      {imgPath:'/asset/img/product.png',title:'商品四 只有想不到 官方直销 优惠多多',price:'5.98',oldPrice:'30.00',countdown:'2018-08-30 18:29:00'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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