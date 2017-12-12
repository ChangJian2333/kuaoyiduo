// fillOutTable.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableListData: [
      { "code": "01", keyboard: "digit", "text": "*喂料量(斤)", "value":"0", "placeholder": "请输入喂料量" },
      { "code": "02", keyboard: "digit", "text": "产蛋量(斤)", "value":"0", "placeholder": "请输入产蛋量" },
      { "code": "03", keyboard: "digit", "text": "破蛋数(枚)", "value":"0", "placeholder": "请输入破蛋数" },
      { "code": "04", keyboard: "digit", "text": "死淘数(只)", "value":"0", "placeholder": "请输入死淘数" },
      { "code": "05", keyboard: "digit", "text": "平均体重(斤)", "value":"", "placeholder": "请输入平均体重" },
      { "code": "06", keyboard: "digit", "text": "平均蛋重(克)", "value":"", "placeholder": "请输入平均蛋重" },
      { "code": "07", keyboard: "digit", "text": "当日支出(元)", "value":"0", "placeholder": "请输入当日支出" },
      { "code": "08", keyboard: "digit", "text": "当日收入(元)", "value":"0", "placeholder": "请输入当日收入" },
      { "code": "09", keyboard: "digit", "text": "当日蛋价(元)", "value": "0", "placeholder": "请输入当日蛋价" },
      { "code": "10", keyboard: "text", "text": "当日备注", "value": "", "placeholder": "" },
    ],
    // 现存只数
    liveNumber:'0',
    // 鸡舍号
    henName:'',
    // 鸡舍ID
    historyId:'',
    // 日期
    henhouseTime:'',
    // 日龄
    days:'',
    // 饲料量
    forageWeight: '0',
    // 产蛋量
    eggWeight:'0',
    // 破蛋数
    smashEgg:'0',
    // 死淘数
    dieNumber:'0',
    // 体重
    chickMiddleweight:'',
    // 蛋重
    eggMiddleweight:'',
    // 支出
    pay:'0',
    // 收入
    earn:'0',
    // 蛋价
    eggprice:'0',
    // 当日备注
    remark:'',
    // 1记录中 0结束记录
    status: '1',
    //是否正在提交
    isCommit:false,
  },

  /**
     * 键盘输入触发
     */
  bindKeyInput: function (e) {
    if (e.currentTarget.dataset.tag == "01") {
      this.setData({
        forageWeight: e.detail.value
      })
      console.log("修改喂料量");
    } else if (e.currentTarget.dataset.tag == "02") {
      this.setData({
        eggWeight: e.detail.value
      })
      console.log("修改产蛋量");
      console.log(this.data.phoneNumber);
    } else if (e.currentTarget.dataset.tag == "03") {
      this.setData({
        smashEgg: e.detail.value
      })
      console.log("修改破蛋数");
    } else if (e.currentTarget.dataset.tag == "04") {
      if (e.detail.value == "3") {
        wx.hideKeyboard();
      }
      this.setData({
        dieNumber: e.detail.value
      })
      
      console.log("修改死淘数");
    } else if (e.currentTarget.dataset.tag == "05") {
      this.setData({
        chickMiddleweight: e.detail.value
      })
      
      console.log("修改平均体重");
    } else if (e.currentTarget.dataset.tag == "06") {
      this.setData({
        eggMiddleweight: e.detail.value
      })
      console.log("修改平均蛋重");
    } else if (e.currentTarget.dataset.tag == "07") {
      this.setData({
        pay: e.detail.value
      })
      console.log("修改当日支出");
    } else if (e.currentTarget.dataset.tag == "08") {
      this.setData({
        earn: e.detail.value
      })
      console.log("修改当日收入");
    } else if (e.currentTarget.dataset.tag == "09") {
      this.setData({
        eggprice: e.detail.value
      })
      console.log("修改当日蛋价");
    } else if (e.currentTarget.dataset.tag == "10") {
      this.setData({
        remark: e.detail.value
      })
      console.log("修改当日备注");
    }
  },

  /**
   * 点击修改历史记录
   */
  clickModifyHistory:function(){
    wx.navigateTo({
      url: '../modifyHistory/modifyHistory?historyId=' + this.data.historyId + '&henName=' + this.data.henName,
    })
  },

  //验证字符串是否是数字
  checkParam:function (){
    var param = this.data;
    var title = '';
    var zhengshu = /^\+*\d+$/;
    var xiaoshu = /^0*[.]\d+$/;
    var regu = /^[0-9]+([.]{0,1}[0-9]+){0,1}$/;
    var reg = new RegExp(regu);
    
    if (!reg.test(param.forageWeight) && param.forageWeight.length > 0) {
      title = '喂料量输入有误！'
    } else if (!reg.test(param.eggWeight) && param.eggWeight.length > 0) {
      title = '产蛋量输入有误！'
    } else if (!reg.test(param.smashEgg) && param.smashEgg.length > 0) {
      title = '破蛋数输入有误！'
    } else if (!reg.test(param.dieNumber) && param.dieNumber.length > 0) {
      title = '死淘数输入有误！'
    } else if (!reg.test(param.chickMiddleweight) && param.chickMiddleweight.length > 0) {
      title = '平均体重输入有误！'
    } else if (!reg.test(param.eggMiddleweight) && param.eggMiddleweight.length > 0) {
      title = '平均蛋重输入有误！'
    } else if (!reg.test(param.pay) && param.pay.length > 0) {
      title = '当日支出输入有误！'
    } else if (!reg.test(param.earn) && param.earn.length > 0) {
      title = '当日收入输入有误！'
    } else if (!reg.test(param.eggprice) && param.eggprice.length > 0) {
      title = '当日蛋价输入有误！'
    } 
    
    if (this.data.days >= 150) {
      if (!(param.eggWeight > 0)) {
        title = '产蛋量必填！'
      }
    }

    if (!(param.forageWeight > 0) && title != '喂料量输入有误！'){
      title = '喂料量必填！'
    }
          
    if(title){
      wx.showModal({
        content: title,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      })
      return false;
    }
    return true;
  },

/**
   * 点击保存按钮
   */
  clickSaveTable:function (){
    if (this.data.isCommit == true){
      return;
    }
    
    var that = this;
    var status = this.checkParam()
    if (status){
      var nowNumber = this.data.liveNumber - this.data.dieNumber
      if (nowNumber < 100) {
        wx.showModal({
          title: '现存栏数不足100只',
          content: '本批鸡是否全部淘汰？淘汰后不能修改本批次的历史记录！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                status: '0'
              });
              that.saveRequest();
            }
          }
        })
      } else if (parseFloat(this.data.dieNumber) > parseFloat(this.data.liveNumber)){
        wx.showModal({
          title: '死淘数输入有误',
          content: '死淘数超出现存栏数，请重新输入s！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      }else{
        this.saveRequest();
      }
    }
  },

  saveRequest() {
    this.data.isCommit = true;
    var that = this;
    var hudTool = require("../../tool/HUDTool.js")
    console.log("网络请求");
    console.log(that.data.page);
    var param = {
      recordDate: that.data.henhouseTime,
      days: that.data.days,
      henNo: that.data.historyId,
      forageWeight: that.data.forageWeight,
      eggWeight: that.data.eggWeight,
      smashEgg: that.data.smashEgg,
      dieNumber: that.data.dieNumber,
      avgWeight: that.data.chickMiddleweight,
      avgeggWeight: that.data.eggMiddleweight,
      pay: that.data.pay,
      earn: that.data.earn,
      remark: that.data.remark,
      dayNumber: that.data.liveNumber - that.data.dieNumber,
      eggprice: that.data.eggprice,
      // rd_session: app.globalData.rd_session,
    };
    console.log(param);
    hudTool.showLoading('保存中')
    wx.request({
      url: app.globalData.baseUrl + "recordHenrecord?status=" + that.data.status + '&rd_session=' + app.globalData.rd_session, 
      method: 'POST',
      data: param,
      
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var code = res.data.resp_head.retcode
        if (code == 1) {
          wx.showModal({  //保存成功
            title: '保存完成',
            content: '是否前往查看详细记录？',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.navigateTo({
                  url: '../performance/performance?henNumber=' + that.data.historyId + '&status=1' + '&henName=' + that.data.henName,
                })
              } else { //返回上级页面
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }else{
          that.data.isCommit = false;
        }
        hudTool.cancelLoading()
      },
      fail: function (res) {
        that.data.isCommit = false;
        hudTool.cancelLoading()
        console.log("失败");
        console.log(res);
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var eggWeight = '产蛋量(斤)'
    if (options.days >= 150){
      eggWeight = '*产蛋量(斤)'
    }
    var list = this.data.tableListData
    list[1].text = eggWeight
    this.setData({
      henName: options.henName,
      henhouseTime: options.henhouseTime,
      days:options.days,
      historyId: options.historyId,
      liveNumber: options.liveNumber,
      tableListData: list,
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