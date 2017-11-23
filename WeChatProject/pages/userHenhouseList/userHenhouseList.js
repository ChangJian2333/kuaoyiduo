
var app = getApp()
var timeUtil = require('../../tool/TimeTool.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [

    ],
    lookStatus:'1',
    phone:null,
    name:null,
  },
  /**
     * 点击查看记录中批次
     */
  clickOnlineHenhouse: function () {
    this.setData({
      lookStatus:'1'
    })
    this.pullData()
  },
  
  /**
     * 点击查看已淘汰批次
     */
  clickEndHenhouse: function() {
    this.setData({
      lookStatus: '0'
    })
    this.pullData()
  },

  /**
   * 点击查看鸡舍详情
   */
  pushToPerformance: function (e) {
    var itemData = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../performance/performance?henNumber=' + itemData.id + '&henName=' + itemData.henName,
    })
  },

  /**
     * 点击cell 记录按钮
     */
  clickCellRecord: function (e) {
    var itemData = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../fillOutTable/fillOutTable?henName=' + itemData.henName + '&henhouseTime=' + itemData.recordDate + '&days=' + itemData.startAge + '&historyId=' + itemData.id + '&liveNumber=' + itemData.numbers,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone:options.phone,
      name: options.name + '的鸡舍列表',
    })
    wx.setNavigationBarTitle({ title: this.data.name })
    this.pullData();
  },



  pullData() {
    var that = this
    var network = require("../../tool/NetWorkManager.js")
    var hudTool = require("../../tool/HUDTool.js")
    var url = app.globalData.baseUrl + "henhouses?rd_session=" + app.globalData.rd_session
    var param = {
      status: that.data.lookStatus,
      phone: that.data.phone,
    }
    var success = function (resp) {
      hudTool.cancelLoading()
      var array = resp.resp_body
      console.log(resp)
      console.log(array)
      console.log('请求成功')
      for (var i = 0; i < array.length; i++) {
        var newDate = new Date();
        newDate.setTime(array[i].recordDate)
        // var str = newDate.toLocaleDateString()
        // var strrrr = str.replace("/", "-")
        array[i].recordDate = timeUtil.formatTime(newDate, 'Y-M-D')//strrrr.replace("/", "-")
        console.log(array[i].recordDate)
      }
      that.setData({
        listData: array,
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    var fail = function (resp) {
      hudTool.cancelLoading()
      console.log('请求失败')
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    hudTool.showLoading('请求中')
    network.request('GET', url, param, success, fail)
  },

  formatTime: function (date, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    returnArr.push(date.getFullYear());
    returnArr.push(this.formatNumber(date.getMonth() + 1));
    returnArr.push(this.formatNumber(date.getDate()));

    returnArr.push(this.formatNumber(date.getHours()));
    returnArr.push(this.formatNumber(date.getMinutes()));
    returnArr.push(this.formatNumber(date.getSeconds()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },

  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
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