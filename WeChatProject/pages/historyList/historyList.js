// historyList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      
    ]

  },
/**
   * 点击cell
   */
  clickCellRecord:function(e){
    var item = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../performance/performance?henNumber=' + item.id,
    })
    console.log(e.currentTarget.dataset.tag)
  },
  /**
   * 点击cell
   */
  clickCellChange: function (e) {
    var itemData = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../modifyHistory/modifyHistory?historyId=' + itemData.id + '&henName=' + itemData.henName,
    })
  },
  
  pullData() {
    var that = this;
    console.log("网络请求");
    console.log(that.data.page);
    wx.request({
      url: app.globalData.baseUrl + "henhouses",
      method: 'GET',
      data: {
        rd_session: app.globalData.rd_session,
        status: '0'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var array = res.data.resp_body
        var code = res.data.resp_head.retcode
        if (code == 1) {

          for (var i = 0; i < array.length; i++) {
            var startDate = new Date();
            var recordDate = new Date();
            startDate.setTime(array[i].startDate)
            recordDate.setTime(array[i].recordDate)
            array[i].startDate = startDate.toLocaleDateString()
            array[i].recordDate = recordDate.toLocaleDateString()
            console.log(array[i].startDate)
            console.log(array[i].recordDate)
          }
          console.log(array)
          that.setData({
            listData: array,
          })
        } else {
          console.log('请求失败了');
        }
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail: function (res) {
        console.log("失败");
        console.log(res);
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.pullData();
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