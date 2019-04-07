// pages/order/index.js
var app = getApp()
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mdata: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.mdata)

    var mdata = JSON.parse(options.mdata)
    var that = this
    that.setData({
      mdata: mdata
    })
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
  formSubmit: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var formData = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    util.request(api.OrderCheckout, that.data.mdata, 'POST').then(function(res) {
      wx.hideLoading();
      var result = res.data.code
      var toastText = res.data.message
      if (result != '200') {
        console.error('网络请求失败');
        wx.showModal({
          content: toastText,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        // wx.navigateBack();
        return;
      }
      var data = {
        "advisorId": app.globalData.advisorId,
        "openId": app.globalData.openId,
        "policyHolderCertId": that.data.mdata.applyVM.applyCard,
        "policyHolderEmail": that.data.mdata.applyVM.applyEmail,
        "policyHolderName": that.data.mdata.applyVM.applyName,
        "policyHolderPhone": that.data.mdata.applyVM.applyTel
      }
      util.request(api.SavePolicyHolderInfo, data, 'POST').then(function(res) {
        console.log('更新我的信息')
      })
      /* wx.request({
        url: app.globalData.api + app.globalData.advisor + 'savepolicyholderinfo',
        method: 'POST',
        data: {
          "advisorId": app.globalData.advisorId,
          "openId": app.globalData.openId,
          "policyHolderCertId": that.data.mdata.applyVM.applyCard,
          "policyHolderEmail": that.data.mdata.applyVM.applyEmail,
          "policyHolderName": that.data.mdata.applyVM.applyName,
          "policyHolderPhone": that.data.mdata.applyVM.applyTel
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('更新我的信息')
        }
      }) */
      wx.navigateTo({
        url: '../payment/payment?url=' + encodeURIComponent(res.data.data.mdata.payUrl)
      })

    })
  },

  showButton: function() {
    var that = this;
    wx.navigateTo({
      url: '../payment/index',
    })
  }
})