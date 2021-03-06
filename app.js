import { Http } from './utils/http'
import { url } from './utils/static/urls'
import { showLoading,hideLoading,openAlert } from './utils/util'

const http = new Http()
const aes =  require('./asset/js/aes')
App({
      onLaunch: function () {
            // 展示本地存储能力
            //var logs = wx.getStorageSync('logs') || []
            //logs.unshift(Date.now())
            //wx.setStorageSync('logs', logs)

            var openid = wx.getStorageSync("openid")
            // 每次都登录
            if (false) {
                  console.log("openid=", wx.getStorageSync("openid"))
                  console.log("session_key=", wx.getStorageSync("session_key"))
            } else {
                  // 登录
                  let that = this
                  showLoading()
                  http.wxLogin().then(res => {
                        console.log('1', res)
                        if (res.code) {
                              return http.postRequest(url.wxLogin, {
                                    app_id: that.globalData.config.app_id,
                                    app_secret: that.globalData.config.app_secret,
                                    code: res.code
                              })
                        } else {
                              //openAlert('登录失败！')
                              throw "登录失败！"
                        }
                  }).then(res => {
                        console.log('21',res)
                        if(res.data.returnCode == '200'){
                              if(res && res.data.secure == 1){

                              }else if (res && res.data.secure == 2) {
                                     
                              }
                              //获取openid并保存
                              let user = aes.Decrypt(res.data.data)
                              user = JSON.parse(user.match(/({.*})/)[1])
                              console.log('2',user)
                              wx.setStorageSync("openid",user.minpro_openid)
                              user.id = +user.id
                              that.globalData.user = user
                        } else {
                              throw "获取openid失败！"
                        }
                        
                  }).catch(res => {
                        console.log('error!', res)
                        that.globalData.bindAccount = null
                        openAlert(res)
                  }).finally(() => {
                        hideLoading()
                  })
                  // wx.login({
                  //       success: res => {
                  //             // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  //             console.log("login get code=:", res.code)

                  //             var app_id = this.globalData.config.app_id
                  //             var app_secret = this.globalData.config.app_secret

                  //             var prefix=this.globalData.server.prefix
                  //             // console.log("on launch ",prefix)
                  //             // return
                  //             var url = prefix+'/api/wechat/get_session_key?'
                  //             var params = "appid=" + app_id + "&secret=" + app_secret + "&js_code=" + res.code + "&grant_type=authorization_code";                              

                  //             wx.showLoading({
                  //                   title: '登录中...',
                  //             })
                  //             wx.request({
                  //                   url: url+params,
                  //                   method: "GET",
                  //                   success: function (res) {
                  //                         console.log(res)
                  //                         if (res.errMsg == "request:ok") {
                  //                               var obj = JSON.parse(res.data);
                  //                               wx.setStorageSync("session_key", obj.session_key)
                  //                               wx.setStorageSync("openid", obj.openid)
                  //                         }
                  //                   },
                  //                   complete: function () {
                  //                         wx.hideLoading()
                  //                   }
                  //             })

                  //       }
                  // })

            }

            // 获取用户信息 代码必须写在这里！！！ 还有一个地方是哪个页面需要用户信息，哪个页面再去调用！
            wx.getSetting({
                  success: res => {
                        console.log(res)
                        if (res.authSetting['scope.userInfo']) {
                              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                              wx.getUserInfo({
                                    success: res => {
                                          // 可以将 res 发送给后台解码出 unionId
                                          console.log("app.js getUserInfo")
                                          this.globalData.userInfo = res.userInfo
                                          console.log(res.userInfo)

                                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                          // 所以此处加入 callback 以防止这种情况
                                          if (this.userInfoReadyCallback) {
                                                this.userInfoReadyCallback(res)
                                          }
                                    }
                              })
                        }
                  }
            })

      },
      globalData: {
            userInfo: null,
            user:null,
            config: {
                  app_id: "wxcfe48e0e0f3e647c",
                  app_secret: "15af4763520049a652e8d48d989c485d",

            },
            server: {
                  prefix: "https://www.qntv3h.com/"
            }
      }
})