// performance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumTitleList: [
      { 'text':'入舍只数'},
      { 'text':'现存只数'},
      { 'text':'累计喂料量'},
      { 'text':'累计产蛋量'},
      { 'text':'累计收入'},
      { 'text':'累计支出'},
    ],
    titleList: [
      { 'text':'日期'},
      { 'text':'日龄'},
      { 'text':'料蛋比'},
      { 'text':'产蛋量'},
      { 'text':'喂料量'},
      { 'text':'150天后累计料蛋'},
      { 'text':'蛋重(g)'},
      { 'text':'当天产蛋率'},
      { 'text':'备注'},
    ],
    listData: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    scrollviewWid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          historyId: options.historyId,
          henName: options.henName,
          scrollviewWid: windowWidth - 20,
        });
      },
    })
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