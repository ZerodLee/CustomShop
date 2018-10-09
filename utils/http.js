var Promise = require('./es6-promise.min.js')

//import * as importpromise from './es6-promise.min.js'

class Http {
    constructor(){
        
    }
    wxPromisify(fn) {
        return function (obj = {}) {
            return new Promise((resolve, reject) => {
                obj.success = function (res) {
                    //成功
                    resolve(res)
                }
                obj.fail = function (res) {
                    //失败
                    reject(res)
                }
                fn(obj)
            })
        }
    }
    /**
     * 微信请求get方法
     * url
     * data 以对象的格式传入
     */
    getRequest(url, data) {
        var getRequest = this.wxPromisify(wx.request)
        return getRequest({
            url: url,
            method: 'GET',
            data: data,
            header: {
                'Content-Type': 'application/json'
            }
        })
    }

    /**
     * 微信请求post方法封装
     * url
     * data 以对象的格式传入
     */
    postRequest(url, data) {
        var postRequest = this.wxPromisify(wx.request)
        return postRequest({
            url: url,
            method: 'POST',
            data: data,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
        })
    }
    /**
     * 微信请求自定义方法封装
     * url
     * data 以对象的格式传入
     * method
     * type,token
     */
    coustomRequest(url, data,method,type,token = '') {
        var postRequest = this.wxPromisify(wx.request)
        var header = token?{"content-type": type,"token":token}:{"content-type": type}
        return postRequest({
            url: url,
            method: method,
            data: data,
            header: header,
        })
    }
    tokenPostRequest(url, data,token = '') {
        var postRequest = this.wxPromisify(wx.request)
        return postRequest({
            url: url,
            method: 'POST',
            data: data,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                "token":token
            },
        })
    }

    uploadFile(url,filePath,formData,token){
        var uploadRequest = this.wxPromisify(wx.uploadFile)
        return uploadRequest({
            url: url,
            filePath: filePath,
            name: 'pic_head',
            formData: formData,
            header: {
                "token":token
            },
        })
    }

    wxLogin() {
        let wxLogin = this.wxPromisify(wx.login)
        return wxLogin()
    }
    wxGetSetting() {
        let wxGetSetting = this.wxPromisify(wx.getSetting)
        return wxGetSetting()
    }
    wxGetUserInfo(){
        let wxGetUserInfo = this.wxPromisify(wx.getUserInfo)
        return wxGetUserInfo()
    }

}

export {
    Http
}