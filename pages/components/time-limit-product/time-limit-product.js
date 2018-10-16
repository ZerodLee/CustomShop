// pages/components/time-limit-product/time-limit-product.js
import { CountDown } from '../../../utils/countdown'
const timeDown = new CountDown()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productData: {type: Object, value: {}},
  },
  externalClasses: ['time-limit-class'],
  /**
   * 组件的初始数据
   */
  data: {
    productData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goLimitProDetail(e){
      console.log(e)
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '../proDetail/proDetail?id=' + item.id
      })
    },
  },
  created:function(){
    
  },
  attached:function() {
    
  },
  ready: function() {
    
  },
  
})
