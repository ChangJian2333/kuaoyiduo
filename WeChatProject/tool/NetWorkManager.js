
function request(method,url, params, success, fail) {
  this.requestLoading(method,url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(method,url, params, message, success, fail) {
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  
  // params.status = '3'; 修改
  // params['name'] = 'test'; 增加
  console.log(params);
  wx.request({
    url: url,
    data: params,
    header: {
      'Content-Type': 'application/json'
    },
    method: method,
    success: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      console.log(res.data);
      var array = res.data.resp_body
      var code = res.data.resp_head.retcode
      if (code = 1) {
        success(res.data)
      }else{
        fail()
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading
}

