// modifyHistory.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [

    ],
    // 鸡舍名字
    henName:'',
    historyId:null,
    scrollviewWid: 100,
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
  /**
     * 平均体重修改
     */
  PJTZbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.avgWeight != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.avgWeight = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  /**
   * 平均蛋重修改
   */
  PJDZbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.avgeggWeight != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.avgeggWeight = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  /**
   * 当日支出修改
   */
  DRZCbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.pay != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.pay = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  /**
   * 当日收入修改
   */
  DRSRbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.earn != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.earn = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
  /**
   * 当日备注修改
   */
  DRBZbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.remark != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.remark = e.detail.value
      item['henNo'] = this.data.historyId
      console.log(item)
      this.changeRequest(item);
    }
  },
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
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
        console.log("成功");
      }
    },
    fail: function (res) {
      wx.showToast({
        title: '修改失败',
        icon: 'fail',
        duration: 1000
      })
      console.log("失败");
      console.log(res);
    },
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth; 
        that.setData({
          historyId: options.historyId,
          henName: options.henName,
          scrollviewWid: windowWidth - 100 - 20,
        });
      },
    })
    this.setData({
      historyId: options.historyId,
      henName: options.henName,
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
          for (var i = 0; i < array.length; i++) {
            var newDate = new Date();
            newDate.setTime(array[i].recordDate)
            array[i].recordDate = that.formatTime(newDate, 'Y-M-D')//strrrr.replace("/", "-")
            console.log(array[i].recordDate)
          }
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