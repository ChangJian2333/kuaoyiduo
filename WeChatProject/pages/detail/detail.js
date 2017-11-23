// detail.js
var app = getApp()
var timeUtil = require('../../tool/TimeTool.js');  
Page({

// ceshi 
  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      
    ],
    isAdmin:false,
    status:null,
  },
/**
   * 点击查看已淘汰批次
   */
  clickEndRegistHenhouse: function(){
    wx.navigateTo({
      url: '../historyList/historyList',
      // url: '../searchUser/searchUser',
    })
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

    //获取当前时间戳  
    var timestamp = timeUtil.formatTime(new Date() ,'Y-M-D')
    console.log('当前时间戳为：' + timestamp);  


    var itemData = e.currentTarget.dataset.tag;
    if (itemData.recordDate > timestamp){
      wx.showModal({
        title: '日期未到',
        content: '不能提前填写记录！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');

          }
        }
      })
      return;
    }
    wx.navigateTo({
      url: '../fillOutTable/fillOutTable?henName=' + itemData.henName + '&henhouseTime=' + itemData.recordDate + '&days=' + itemData.startAge + '&historyId=' + itemData.id + '&liveNumber=' + itemData.numbers,
    })
  },
  /**
   * 点击cell 修改按钮
   */
  clickCellChange: function (e) {
    var itemData = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../modifyHistory/modifyHistory?historyId=' + itemData.id + '&henName=' + itemData.henName,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isAdmin: app.globalData.isAdmin,
      status: options.status,

    })
      this.pullData(); 
  },



  pullData() {
    var that = this
    var network = require("../../tool/NetWorkManager.js")
    var hudTool = require("../../tool/HUDTool.js")
    var url = app.globalData.baseUrl + "henhouses?rd_session=" + app.globalData.rd_session
    var param = {
      status: '1',
    }
    var success = function (resp) {
      hudTool.cancelLoading()
      var array = resp.resp_body
      console.log(resp)
      console.log(array)
      var code = resp.resp_head.retcode
      if (code == 1) {
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
      }
      
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
    if (this.data.status == 1) {
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