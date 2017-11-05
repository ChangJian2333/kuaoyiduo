//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    this.login();
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },


  login: function (fun) {
    if (this.globalData.userInfo) {
      typeof fun == "function" && fun(this.globalData.userInfo)
    } else {
      var that = this;
      wx.login({
        success: function (res) {
          var code = res.code;
          var getUrl = 'https://75003247.kuaiyidduoyz.com/api/getOpenId';
          // console.log('请求地址为' + getUrl)
          wx.getUserInfo({
            success: function (res) {
              wx.request({

                // url: 'https://66981293.qcloud.la/api/getOpenId',
                // url: 'http://192.168.1.3:8080/api/getOpenId',
                url: getUrl,
                data: {
                  code: code
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json',
                  // 'Cookie': document.cookie
                },
                success: function (res) {
                  console.log(res);
                  that.globalData.userInfo = res.data.result;
                  that.globalData.rd_session = res.data;
                  wx.setStorageSync('userInfo', res);//存储openid    
                },
                fail: function (res) {
                  console.log("失败");
                  console.log(res);
                },

              })

            },
            fail: function () {

            },
          })

        },
        fail: function () {

        },
      })
    }

  },


  globalData: {
    userInfo: null,
    rd_session:"",
    // baseUrl: 'https://66981293.qcloud.la/api/wechat/',
    // baseUrl:'http://192.168.1.3:8080/api/wechat/'
    baseUrl: 'https://75003247.kuaiyidduoyz.com/api/wechat/',
  }
})
