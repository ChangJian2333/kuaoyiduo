// performance.js
var app = getApp()
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
      { 'text':'料蛋比（10天）'},
      { 'text':'产蛋量（10天）'},
      { 'text':'喂料量（10天）'},
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
    sumDic:{},
    scrollviewWid:null,
    henNumber:null,
    pageIndex:1,
    isHideLoadMore:true,
    status:null,
    totalpage:1,
  },

  pullData() {
    var that = this;
    console.log("网络请求");
    console.log(that.data.page);
    wx.request({
      url: app.globalData.baseUrl + "getAllPropertyList?rd_session=" + app.globalData.rd_session,
      method: 'GET',
      data: {
        page: that.data.pageIndex,
        henno: that.data.henNumber
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var page = that.data.pageIndex
        console.log(res.data);
        var array = res.data.resp_body
        var code = res.data.resp_head.retcode
        console.log(res)
        if (code == 1) {
          that.data.totalpage = res.data.totalpage;
          console.log(array)
          var dataSource = that.data.listData
          if (that.data.pageIndex > 1){
              dataSource = dataSource.concat(array)
          }else{
            dataSource = array
            that.setData({
              sumDic: res.data.houseDTO,
            })
          }
          console.log(dataSource)
          that.setData({
            listData: dataSource,
          })
        } else {
          console.log('请求失败了');
          if (page > 1) {
            page = page - 1
          }
        }
        that.setData({
          pageIndex: page,
          isHideLoadMore: true,
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail: function (res) {
        console.log("失败");
        console.log(res);
        var page = that.data.pageIndex
        if (page > 1) {
          page = page - 1
        }
        that.setData({
          pageIndex: page,
          isHideLoadMore: true,
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
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
          henNumber: options.henNumber,
          status: options.status,
        });
      },
    })
    this.pullData()
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
    this.setData({
      pageIndex: 1,
    })
    this.pullData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isHideLoadMore == false){ // 正在进行上拉操作
      return;
    }
    var page = this.data.pageIndex + 1
    if (page > this.data.totalpage){ // 超出总页数
      return;
    }
    this.setData({
      pageIndex: page,
      isHideLoadMore:false,
    })
    this.pullData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})