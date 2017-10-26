//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '进入快易多养殖',
  },


   //进入详情页
  pushDetailPage: function() {
    wx.navigateTo({
      
      url: '../detail/detail'
    })
  }, 

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
  }
})