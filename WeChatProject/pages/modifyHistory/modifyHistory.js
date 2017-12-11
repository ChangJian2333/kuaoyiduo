// modifyHistory.js
var app = getApp()
var timeUtil = require('../../tool/TimeTool.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:[
      '喂料量', '产蛋量', '破蛋数', '死淘数', '平均体重', '平均蛋重', '当日支出', '当日收入', '当日蛋价'
    ],
    listData: [

    ],
    // 鸡舍名字
    henName:'',
    historyId:null,
    scrollviewWid: null,
    pageIndex: 0,
    isHideLoadMore: true,
    totalpage: 1,

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
 * 当日蛋价修改
 */
  DRDJbindKeyBlur: function (e) {
    var item = this.data.listData[e.currentTarget.dataset.tag];
    if (item.eggprice != e.detail.value) { // 参数修改了
      console.log(e.currentTarget.dataset.tag);
      console.log(e.detail.value);
      item.eggprice = e.detail.value
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
      if (code == 1) {
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
      henNo: that.data.historyId,
      page:that.data.pageIndex,
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
        var page = that.data.pageIndex
        var array = res.data.resp_body
        var code = res.data.resp_head.retcode

        if (code == 1) {
          that.data.totalpage = res.data.totalpage;
          console.log(array);
          for (var i = 0; i < array.length; i++) {
            var newDate = new Date();
            newDate.setTime(array[i].recordDate)
            array[i].recordDate = timeUtil.formatTime(newDate, 'Y-M-D')//strrrr.replace("/", "-")
            console.log(array[i].recordDate)
          }
          var dataSource = that.data.listData
          if (that.data.pageIndex > 0) {
            dataSource = dataSource.concat(array)
          }else{
            dataSource = array
          }
         that.setData({
           listData: dataSource,
         })
        
        } else {
          console.log('请求失败了');
          if (page > 0) {
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
        if (page > 0) {
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
    this.setData({
      pageIndex: 0,
    })
    this.pullData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isHideLoadMore == false) { // 正在进行上拉操作
      return;
    }
    var page = this.data.pageIndex + 1
    if (page >= this.data.totalpage){ // 超出最大页数
      return;
    }
    this.setData({
      pageIndex: page,
      isHideLoadMore: false,
    })
    this.pullData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})