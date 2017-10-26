// registHenhouse.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phoneNumber: "",
    henhouseNumber: "",
    startTime: "",
    days: "",
    henNumber: "",
    variety: "",
    forageVender: "",
    nowTime:"",
    henAdrress:""
  },
/**
   * picker值改变的时候
   */
  bindDateChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
    console.log(app.globalData);
  },

/**
   * 键盘输入触发
   */
  bindKeyInput: function (e) {
    if (e.currentTarget.dataset.tag == "01"){
      this.setData({
        name:e.detail.value
      })
      console.log("修改姓名");
    } else if (e.currentTarget.dataset.tag == "02"){
      this.setData({
        phoneNumber: e.detail.value
      })
      console.log("修改电话");
      console.log(this.data.phoneNumber);
    } else if (e.currentTarget.dataset.tag == "03"){
      this.setData({
        henhouseNumber: e.detail.value
      })
      console.log("修改鸡舍号");
    } else if (e.currentTarget.dataset.tag == "04") {
      if(e.detail.value == "3"){
        wx.hideKeyboard();
      }
      this.setData({
        startTime: e.detail.value
      })
      console.log("修改上鸡日期");
    } else if (e.currentTarget.dataset.tag == "05") {
      this.setData({
        days: e.detail.value
      })
      console.log("修改上鸡日龄");
    } else if (e.currentTarget.dataset.tag == "06") {
      this.setData({
        henNumber: e.detail.value
      })
      console.log("修改只数");
    } else if (e.currentTarget.dataset.tag == "07") {
      this.setData({
        variety: e.detail.value
      })
      console.log("修改品种");
    } else if (e.currentTarget.dataset.tag == "08") {
      this.setData({
        forageVender: e.detail.value
      })
      console.log("修改饲料厂家");
    } else if (e.currentTarget.dataset.tag == "09"){
      this.setData({
        henAdrress: e.detail.value
      })
      console.log("修改鸡舍地址");
    }
  },

/**
   * 点击确定
   */
  clickRegistHenhouse:function (){
    if (this.checkParam()){
      console.log("成功");
      this.commitRequest();
    }
  },
  //验证手机号是否合格
  checkParam: function () {

    var param = this.data;
    var title = "";
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    console.log(param + '参数');
    if(!param.name){
        title = '请输入姓名！'
    }else if(!reg.test(param.phoneNumber)){
      title = '手机号码输入格式有误！'
    }else if (!(param.henhouseNumber.length > 0)) {
      title = '请输入鸡舍号！'
    }else if (!(param.startTime.length > 0)) {
      title = '请输入上鸡日期！'
    }else if (!(param.days.length > 0)) {
      title = '请输入上鸡日龄！'
    }else if (!(param.henNumber.length > 0)) {
      title = '请输入上鸡只数！'
    }else if (!(param.variety.length > 0)) {
      title = '请输入鸡品种！'
    }else if (!(param.forageVender.length > 0)) {
      title = '请输入厂家名称！'
    } else if (!(param.henAdrress.length > 0)) {
      title = '请输入鸡舍地址！'
    }
    if(title){
      wx.showModal({
        title: '提示',
        content: title,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    }
    return true;
  },
/**
   * 提交表单
   */
  commitRequest:function(){
    var that = this;
    console.log("网络请求");
    console.log(that.data.page);
    var param = {
      userName: that.data.name,
      phoneNumber: that.data.phoneNumber,
      henName: that.data.henhouseNumber,
      startDate: that.data.startTime,
      recordDate: that.data.startTime,
      startAge: that.data.days,
      henNumber: that.data.henNumber,
      numbers: that.data.henNumber,
      henType: that.data.variety,
      henVender: that.data.forageVender,
      henAdrress: that.data.henAdrress,
      // 1 记录中 0 结束记录
      status:'1',
      // rd_session: app.globalData.rd_session,
      };
      console.log(param);
    wx.request({
      url: app.globalData.baseUrl + "registHenhouse?rd_session=" + app.globalData.rd_session,
      method:'POST',
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var code = res.data.resp_head.retcode
        if (code = 1) {
          wx.navigateBack({ //保存成功返回上级页面
            delta: 1
          })
        } else {
          console.log('请求失败了');
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
  
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log('当前时间戳为：' + timestamp);  
    console.log(app.globalData);
    this.setData({
      nowTime: timestamp,
      name: app.globalData.userInfo.name,
      phoneNumber: app.globalData.userInfo.phoneNumber,
    })
    console.log(this.data.name + this.data.phoneNumber + 'hhhh');
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