//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '进入快易多养殖',
    iconUrl:null,
    username:null,
    isAdmin: false,
    listData:[
      { 'icon': '../image/zhuce.png', 'text': '注册新养殖' },
      { 'icon': '../image/jilu.png', 'text': '查看记录中' },
      { 'icon': '../image/taotai.png', 'text': '查看已淘汰' },
      { 'icon': '../image/search.png', 'text': '搜索内部鸡舍' },
    ],
  },

  buttonClick: function(e) {
    var index = e.currentTarget.dataset.tag;
    var pathUrl = null;
    if (index == 0) { // 点击注册
      pathUrl = '../registHenhouse/registHenhouse' //'../fillOutTable/fillOutTable';
    } else if (index == 1) { // 查看记录
      pathUrl = '../detail/detail'//'../performance/performance';
    } else if (index == 2) { // 查看已淘汰
      pathUrl = '../historyList/historyList'
    } else if (index == 3) { // 搜索
      pathUrl = '../searchUser/searchUser'
      if (this.data.isAdmin == true) { // false
        wx.showModal({
          content: '您暂时没有内部鸡舍！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
        return;
      }
    }
    wx.navigateTo({
      url: pathUrl
    })
  },
   //进入详情页
  pushDetailPage: function() {
    wx.navigateTo({
      
      url: '../detail/detail'
    })
  }, 

  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var that = this
    that.setData({
      iconUrl: app.globalData.avatarUrl,
      username: app.globalData.nickName,
      isAdmin: app.globalData.isAdmin,
    })
  }
})
