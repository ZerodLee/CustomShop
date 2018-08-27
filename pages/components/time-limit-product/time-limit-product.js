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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // onLoad: function() {
    //   console.log(this.data.productData)
    // }
  },
  created:function(){
    console.log(this.data.productData,timeDown)
  },
  attached:function() {
    console.log(this.data.productData)
    for(let item of this.data.productData){
      console.log(item)
    }
  },
  ready: function() {
    console.log(this.data.productData)
  },
})
