// pages/my/feedback/feedback.js
//获取应用实例
var app = getApp();
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [{
        picUrl: '../../../images/kong.png',
        name: '产品'
      },
      {
        picUrl: '../../../images/kong.png',
        name: '服务'
      },
      {
        picUrl: '../../../images/kong.png',
        name: '其他'
      }
    ],
    noteMaxLen: 200, //详细地址的字数限制
    currentNoteLen: 0,
    fbinfo: '',
    advisorid: '',
    orderId: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("订单id是" + options.orderid)
    console.log("经纪人id是" + app.globalData.advisorId)
    console.log("用户的openid 是" + app.globalData.openId)

    this.setData({
      advisorid: options.id,
      orderId: options.orderid,

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindTextAreaBlur: function(e) {
    this.setData({
      fbinfo: e.detail.value
    })

  },

  inputs: function(event) {
    var value = event.detail.value;
    var len = parseInt(value.length);

    this.setData({
      currentNoteLen: len
    });
  },

  formSubmit: function(e) {
    var that = this;
    var data = {
      "advisorId": app.globalData.advisorId,
      "feedBackInfo": this.data.fbinfo,
      "openId": app.globalData.openId,
      "feedBackPhone": e.detail.value.phonenNum,
      'feedBackType': e.detail.value.feedBackType,
      "orderId": this.data.orderId
    }
    util.request(api.FeedbackAdd, data, 'POST').then(function(res) {
      if (res == null || res.data == null) {
        console.error('网络请求失败');
        return;
      }
      var premium = res.data;
      wx.showModal({
        content: premium,
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../discovery/discovery',
            })
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    })
  }
})