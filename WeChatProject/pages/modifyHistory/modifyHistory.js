// modifyHistory.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [

    ],
    historyId:null,
  },
  
  /**
   * 喂料量修改
   */
  WLLbindKeyBlur: function (e) {
    
    if (this.data.listData[e.currentTarget.dataset.tag].forageWeight != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      var item = this.data.listData[e.currentTarget.dataset.tag];
      item.forageWeight = e.detail.value
      var param = item
      param['henNo'] = this.data.historyId
      console.log(item)
      console.log(param)
      this.changeRequest(param);
    }
  },
  /**
   * 产蛋量修改
   */
  CDLbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.eggWeight != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.eggWeight = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  /**
   * 破蛋数修改
   */
  PDSbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.smashEgg != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.smashEgg = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  /**
   * 死淘数修改
   */
  STSbindKeyBlur:function(e){
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.dieNumber != e.detail.value){ // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.dieNumber = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  // rd_session: app.globalData.rd_session,
changeRequest:function(param){
  var that = this;
  console.log("网络请求");
  console.log(that.data.page);
  console.log(param);
  wx.request({
    url: app.globalData.baseUrl + "recordHenrecord?status=1&rd_session=" + app.globalData.rd_session,
    method: 'POST',

    data: param,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data);
      var array = res.data.resp_body
      var code = res.data.resp_head.retcode
      if (code = 1) {
        console.log("成功");
      }
    },
    fail: function (res) {
      console.log("失败");
      console.log(res);
    },
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      historyId: options.historyId,
    });
    this.pullData();
  },

  pullData() {
    var that = this;
    console.log("网络请求");
    console.log(that.data.page);
    var param = {
      henNo: that.data.historyId
    }
    wx.request({
      url: app.globalData.baseUrl + "getHenrecordList?rd_session=" + app.globalData.rd_session,
      method: 'GET',
      data:param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var array = res.data.resp_body
        var code = res.data.resp_head.retcode
        if (code = 1) {
          console.log(array);
          that.setData({
            listData: array,
          })
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