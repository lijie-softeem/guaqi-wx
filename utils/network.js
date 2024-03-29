


var app = getApp();
const HOST = app.globalData.HOST;

function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, message, success, fail) {
  var ocryptData = cryptData.cryptData(params, url)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: HOST + '/gateWay',
    data: JSON.stringify(ocryptData),
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function(res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data.params)
        if (res.data.params.respState == 'F' && res.data.params.respShow=='Y'){
             wx.showToast({
               title: res.data.params.respMsg,
               icon:'none',
               duration:2000
             })  
        }
        if (res.data.params.respCode =='TK-INVALID'){
          wx.reLaunch({
            url: '../authorize/authorize',
          })
        }
      } else {
        fail()
      }

    },
    fail: function(res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function(res) {
      wx.stopPullDownRefresh()
    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading
}
