// pages/docHome/docHome.js
var imageUtil = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgFill: null,
    previewShow: false,
    rotateRight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  selfBtnClick: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0]
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            var imageSize = imageUtil.imageUtil(res)
            that.setData({
              imgFill: filePath,
              previewShow: true,
              imagewidth: imageSize.imageWidth,
              imageheight: imageSize.imageHeight
            })
          }
        })
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  otherBtnClick: function () {

  },
  //取消
  previewCancle: function () {
    this.setData({
      imgFill: null,
      previewShow: false,
      rotateRight: 0,
      imagewidth:0,
      imageheight:0
    })
  },
//  旋转
  previewRotate: function () {
    var count = this.data.rotateRight + 90
    this.setData({
      rotateRight: count
    })
  },
  // 原图缩略图
  previewSizeType: function () {

  },
  // 发送
  previewSend: function () {
    this.uploadImgRequest()
  },
  

  uploadImgRequest: function () {
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
      that.setData({
        previewShow: false
      })
      if (code == 1) {
        console.log('请求成功')

      }
    }
    var fail = function (resp) {
      hudTool.cancelLoading()
      console.log('请求失败')
      that.setData({
        previewShow: false
      })
    }
    hudTool.showLoading('请求中')
    network.request('POST', url, param, success, fail)
  },

  // // 预览图片
  // previewImg: function () {
  //   wx.previewImage({
  //     current: this.data.imgFill,
  //     urls: [this.data.imgFill]
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var wid = wx.getSystemInfoSync().windowWidth
    var hig = wx.getSystemInfoSync().windowHeight
    const ctx = wx.createCanvasContext('clearCanvas')
    ctx.setFillStyle('black')
    ctx.fillRect(0, 0, wid, hig - 50)
    ctx.setFillStyle('clear')
    ctx.clearRect(10, 10, 150, 75)
    ctx.draw()
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