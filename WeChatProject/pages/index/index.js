//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '进入快易多养殖',
    iconUrl:null,
    username:null,
    listData:[
      { 'icon': '', 'text': '注册新养殖' },
      { 'icon': '', 'text': '查看记录中' },
      { 'icon': '', 'text': '查看已淘汰' },
      { 'icon': '', 'text': '搜索内部鸡舍' },
    ],
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
    that.setData({
      iconUrl: app.globalData.avatarUrl,
      username: app.globalData.nickName
    })
    
  }
})
