var app = getApp()

Page({

  data: {
    searchTxt: '',
    messages: [
    ],
    page: 1,
    contactsArray: [],
    phone: null,
  },
  onLoad: function (options) {
    var that = this;
    // 生命周期函数--监听页面加载
    this.setData({
      searchTxt: options.searchTxt
    });
    console.log(options.searchTxt);
    that.pullData();
  },

  pushToHenhonseList(e) {
    var itemData = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '../userHenhouseList/userHenhouseList?phone=' + itemData.phone,
    })
  },

  pullData() {
    var that = this;
    var param = {
      'phone': that.data.searchTxt
    };
    wx.request({
      url: app.globalData.baseUrl + "getUsersByPhone?rd_session=" + app.globalData.rd_session,
      method: 'GET',
      data: param,

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('成功成功=======搜索列表');
        console.log(res.data.resp_body);
        var array = res.data.resp_body
        that.setData({ 
          messages: array,
        })
        console.log(that.data.messages)
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },


  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("到底了");
    // 页面上拉触底事件的处理函数
    var that = this
    //更新数据
    var c = that.data.page
    that.setData({
      page: Number(1) + Number(c)
    })
    this.pullData();
  },



  //搜索
  search(event) {
    console.log('搜索')
    var txt = this.data.searchTxt;
    if (txt == null) {
      var txt = ""
    }
    this.setData({
      searchTxt: txt
    });
    this.pullData();
  },

  bindblur: function (e) {
    console.log('文字')
    console.log(e)
    this.setData({
      searchTxt: e.detail.value
    })
  },

})