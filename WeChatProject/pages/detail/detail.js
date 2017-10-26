// detail.js
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
   * 点击查看已淘汰批次
   */
  clickEndRegistHenhouse: function(){
    wx.navigateTo({
      url: '../historyList/historyList',
    })
  },

/**
   * 点击注册鸡舍
   */
  clickRegistHenhouse: function (){
    wx.navigateTo({
      url: '../registHenhouse/registHenhouse',
    })
  },
/**
   * 点击cell 记录按钮
   */
  clickCellRecord: function (e) {
    var itemData = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../fillOutTable/fillOutTable?henName=' + itemData.henName + '&henhouseTime=' + itemData.startDate + '&days=' + itemData.startAge + '&historyId=' + itemData.id + '&liveNumber=' + itemData.numbers,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.pullData(); 
  },



  pullData() {
    var that = this
    var network = require("../../tool/NetWorkManager.js")
    var url = app.globalData.baseUrl + "henhouses?rd_session=" + app.globalData.rd_session
    var param = {
      status: '1',
    }
    var success = function (resp) {
      var array = resp.resp_body
      console.log(resp)
      console.log(array)
      console.log('请求成功')
      wx.showToast({
        title: '请求成功',
        duration: 1000
      })
      for (var i = 0; i < array.length; i++) {
        var newDate = new Date();
        newDate.setTime(array[i].startDate)
        array[i].startDate = newDate.toLocaleDateString()
        console.log(array[i].startDate)
      }
      that.setData({
        listData: array,
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    var fail = function (resp) {
      wx.showToast({
        title: '请求失败',
        duration: 1000
      })
      console.log('请求失败')
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    network.request('GET',url, param, success, fail)
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
    this.pullData();
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