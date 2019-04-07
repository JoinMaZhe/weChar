// pages/payment/index.js
const app = getApp()
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payParam: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var mdata = JSON.parse(options.mdata)
    console.log(options.mdata, mdata)
    const payParam = {
      "body": mdata.name,
      "openId": app.globalData.openId,
      "outTradeNo": mdata.polNo,
      "totalFee": mdata.balance
    };
    this.setData({
      payParam: payParam,
    })
  },
  //采用小程序支付
  bindBilling: function() {
    var payParam = this.data.payParam
    util.request(api.OrderPrepay, payParam, 'POST').then(function(res) {
      console.log('success:' + res);
      wx.requestPayment({
        'timeStamp': res.timeStamp,
        'nonceStr': res.nonceStr,
        'package': res.package,
        'signType': res.signType,
        'paySign': res.paySign,
        //支付成功的回调
        success: function(res) {
          wx.navigateTo({
            url: '../payment/result/index?payParam=' + JSON.stringify(payParam),
          })
          console.log('success:' + JSON.stringify(res));
        },
        //支付失败的回调
        fail: function(res) {
          console.log('fail:' + JSON.stringify(res));
          wx.showToast({
            title: '支付失败:' + JSON.stringify(res),
            icon: 'none',
          })
        },
        complete: function(res) {
          console.log('complete:' + JSON.stringify(res));
        }
      })
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

  }
})