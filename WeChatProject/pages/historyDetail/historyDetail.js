// historyDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response:{

    },
    keyListData: [
      { "code":"1", "keyLeft": "舍号", "keyRight": "上鸡日期"},
      { "code":"2", "keyLeft": "henhouseNumber", "keyRight": "time" },
      { "code":"3", "keyLeft": "累计支出（元）", "keyRight": "累计收入（元）"},
      { "code":"4", "keyLeft": "henhouseNumber", "keyRight": "time" },
      { "code":"5", "keyLeft": "累计喂料量（斤）", "keyRight": "累计产蛋量（斤）"},
      { "code":"6", "keyLeft": "henhouseNumber", "keyRight": "time" },
      { "code": "7", "keyLeft": "近10天的料蛋比", "keyRight": "日龄130以后的料蛋比"},
      { "code":"8", "keyLeft": "henhouseNumber", "keyRight": "time" },
    ],
    henName:'',
    historyId:'',
    status:'',
  },

  pullData() {
    var that = this
    var network = require("../../tool/NetWorkManager.js")
    var url = app.globalData.baseUrl + "getHenHouseDetail?rd_session=" + app.globalData.rd_session
    var param = {
      id: that.data.historyId,
    }
    var success = function (resp) {
      var response = resp.resp_body
      console.log(resp)
      console.log(response)
      console.log('请求成功')
      that.setData({
        response: response,
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    var fail = function (resp) {
      console.log('请求失败')
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    network.request('GET', url, param, success, fail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      henName: options.henName,
      historyId: options.historyId,
      status: options.status,
    });
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
    if(this.data.status == 1){
      wx.navigateBack({
        delta: 1
      })
    }
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