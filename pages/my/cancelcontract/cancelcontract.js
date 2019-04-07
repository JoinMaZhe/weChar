// pages/my/feedback/feedback.js
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 200,         //详细地址的字数限制
    currentNoteLen: 0,
    advisorid: '',
    cancelContract:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.setData({

      advisorid: getApp().globalData.advisorId,

    });


    // var that = this
    //调用应用实例的方法获取全局数据
    // wx.request({
    //   url: "http://10.37.147.172:8096/api/order/findById/" + options.id,
    //   method: 'GET',
    //   success: function (res) {
    //     var entity = res.data.data.mdata;
    //     if (entity == undefined) {
    //       var toastText = '获取数据失败';
    //       wx.showToast({
    //         title: toastText,
    //         icon: '',
    //         duration: 2000
    //       });
    //     } else {
    //       that.setData({
    //         list: entity

    //       });
    //     }
    //   }
    // })


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

  },

  bindTextAreaBlur: function (e) {
    this.setData({
      fbinfo: e.detail.value
    })

  },

  input(event) {
    var value = event.detail.value,
      len = parseInt(value.length);
    let that = this;
    this.setData({
      currentNoteLen: len
    });
  },

  formSubmit: function (e) {

  
    this.data.cancelContract.advisorId = getApp().globalData.advisorId;
    this.data.cancelContract.cancelInfo = e.detail.value.cancelContent;
    var that = this;
    //api.CancleContract
    util.request(api.CancleContract,  this.data.cancelContract,'POST').then(function (res) {
      if (res == null) {
        console.error('网络请求失败');
        return;
      }
      wx.navigateTo({

        url: 'examine/examine'

      })

    })
  },

  hotword: function (e) {
    var ds = e.currentTarget.dataset;
    this.setData({
      fbinfo: ds.content

    });
  },

  cancelInfo: function (e) {

    wx.switchTab({
      url: '../../discovery/discovery'
    });
  },
  
})