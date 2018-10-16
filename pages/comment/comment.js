import { Http } from '../../utils/http'
import { url } from '../../utils/static/urls'

const util = require('../../utils/util.js')
//const aes =  require('../../asset/js/aes')
const app = getApp()
const http = new Http()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:null,
    orderId:0,
    dic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let proinfo = JSON.parse(options.proinfo)
    console.log(proinfo)
    this.setData({
      proList:proinfo.pros,
      orderId:proinfo.id
    })
    for(var i=0;i<this.data.proList.length;i++){
      this.data.dic.push({
        pid:this.data.proList[i].id,
        pics:[]
      })
    }
  },
  findById:function(pid){
    for(var i=0;i<=this.data.proList.length;i++){
      if(this.data.proList[i].id==pid){
        return i;        
      }
    }
    return null
  },
  uploadManyFiles(filePaths,pid,formdata = null,successUp = 0, failUp=0) {
    var that=this
    wx.uploadFile({
      url: url.upload_comment_photo,
      filePath: filePaths[0],
      header:{"token":app.globalData.user.token,"contentType":"multipart/form-data"},
      name: 'upload_file',
      // contentType:"multipart/form-data",
      formData: formdata,
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: (res) => {
        if (filePaths.length == 1) {
          //util.toast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
          console.log(res)
          var data=JSON.parse(res.data)
          console.log(data)
          wx.hideLoading()
          util.toast("上传成功！")
          var picId=data.data.res
          var picUrl=data.data.url

          for(var j=0;j<that.data.dic.length;j++){
            var item=that.data.dic[j]
            if(item.pid==pid){
              // if(item.pics.indexOf(picId)>-1){
              // }
              // else{
                item.pics.push({
                  picId:picId,
                  picUrl:picUrl
                })
              // }

              //给proList赋值
              var productIndex=that.findById(pid)
              that.setData({
                ["proList["+productIndex+"].pics"]:item.pics
              })

              console.log(that.data.proList)
            }
          }

          // 

        }
        else {  //递归调用uploadDIY函数
          filePaths.shift();
          that.uploadManyFiles(filePaths, formdata,successUp, failUp);
        }
      },
    });
  },
  deleteImage:function(e){
    var that=this
    var pid=e.currentTarget.dataset.pid
    var picid=e.currentTarget.dataset.picid
    console.log(pid,picid)
    var productIndex=that.findById(pid)
    var newPics = that.data.proList[productIndex].pics.filter(v => v.picId != picid)
    that.setData({
      ["proList["+productIndex+"].pics"]:newPics
    })
  },
  //选择图片
  chooseImage:function(e){
    let that = this
    var pid=e.currentTarget.dataset.pid
    console.log("choose image")
    var productIndex=that.findById(pid)
    if(that.data.proList[productIndex].pics && that.data.proList[productIndex].pics.length>=3){
      util.toast("最多只能上传3张图片！",'none')
      return 
    }
    wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success: function (res) {
            util.showLoading('图片上传中...')
            //var files = res.tempFilePaths
            
            that.uploadManyFiles(res.tempFilePaths,pid)

            // http.uploadFileComment(url.upload_comment_photo,res.tempFilePaths[0],null,app.globalData.user.token).then(res=>{
            //   console.log(res)
            //   console.log(JSON.parse(res.data))
            // })
        }
    })
  },
  write_comment:function(e){
    var that=this
    var pid=e.currentTarget.dataset.pid
    var val=e.detail.value
    
    var productIndex=that.findById(pid)
    that.setData({
      ["proList["+productIndex+"].comment"]:val
    })
  },
  //确认提交按钮
  submit_back_amount:function(e){
    var that=this
    var param = {oid:that.data.orderId,userid:app.globalData.user.id}
    var find_empty=false;
    var temp_arr=[];
    that.data.proList.forEach((item,idx) => {
      if(item.pics && item.pics.length>0){
        // param['proinfo['+idx+']'] = JSON.stringify({
        //   "attrid1":item.attr1_id,
        //   "attrid2":item.attr2_id,
        //   "content":item.comment,
        //   "photo":item.pics.map(v => v.picId).join(','),
        //   "proid":item.id
        // })

        temp_arr.push({
          "attrid1":item.attr1_id,
          "attrid2":item.attr2_id,
          "content":item.comment,
          "photo":item.pics.map(v => v.picId).join(','),
          "proid":item.id
        })

      }
      else{
        find_empty=true;
      }
    })
    for(var i = 0;i< temp_arr.length;i++){
      if(!util.isHasValue(temp_arr[i].content)){
        util.toast("请填写评价！",'none')
        return false
      }
    }

    if(find_empty){
      util.toast("请先上传图片！",'none')
      return
    }
    param.proinfo=JSON.stringify(temp_arr);

    // for(var i = 0;i< that.data.proList.length;i++){
    //   if(!util.isHasValue(JSON.parse(param['proinfo['+i+']']).content)){
    //     util.toast("请填写评价！",'none')
    //     return false
    //   }
    // }


    console.log(param)

    util.showLoading()
    http.tokenPostRequest(url.send_comment,param,app.globalData.user.token).then(res =>{
      console.log(res)
      if(res.data.returnCode=="200"){
        util.toast(res.data.msg)
        setTimeout(() => {
          wx.navigateBack()
        }, 2000);
      }
      else{
        throw res.data.msg
      }
    }).catch(res =>{
      util.openAlert(res)
    }).finally(() => {
      util.hideLoading()
    })
    // for(var k=0;k<that.data.proList.length;k++){
    //   var item=that.data.proList[k]
    //   if(item.)
    // }
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