// pages/authorize/authorize.js
var app = getApp()
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var user = require('../../utils/user.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: '', //用户唯一标识    
    unionId: '',
    encryptedData: ''
  },
  onLoad: function() {
    var that = this;

  },
  bindGetUserInfo: function(e) {
    if (!e.detail.userInfo) {
      app.globalData.hasLogin = false;
      wx.showModal({
        title: '警告通知',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {}
        }
      })
      return;
    }

    if (app.globalData.isConnected) {
      /* app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('userInfo', e.detail.userInfo)
      let enn_openid = wx.getStorageSync('enn_openid');
      if (enn_openid) {
        app.globalData.openId = wx.getStorageSync('enn_openid');
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          userInfo: app.globalData.userInfo
        });
        wx.navigateBack({
          delta: 1
        })
      } else {
        this.getOpenid();
      }
 */
      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;
        app.globalData.openId = res.openId;
        console.log(wx.getStorageSync('enn_openid'))
        this.saveOpenid(res.openId)
        // 回到原来的地方放
        /* var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          userInfo: app.globalData.userInfo
        }); */
        wx.navigateBack({
          delta: 1
        })
      }).catch((err) => {
        app.globalData.hasLogin = false;
        /* util.showErrorToast('微信登录失败'); */
      });

    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  getOpenid: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        var url = api.LoginByWeixin + '?code=' + res.code
        util.request(url, {}, 'GET').then(function(res) {
          if (res.status == "") {
            app.globalData.openId = res.openId;
            wx.setStorageSync('enn_openid', res.openId)
            console.log(wx.getStorageSync('enn_openid'))
            that.saveOpenid(res.openId)
            // 回到原来的地方放
            /*  var pages = getCurrentPages();
             var currPage = pages[pages.length - 1]; //当前页面
             var prevPage = pages[pages.length - 2]; //上一个页面
             //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
             prevPage.setData({
               userInfo: app.globalData.userInfo
             }); */
            wx.navigateBack({
              delta: 1
            })
          } else {
            that.getOpenid();
          }
        })
      }
    })
  },
  saveOpenid: function(openId) {
    var that = this;
    util.request(api.SaveOpenid, {
      openId: openId
    }, 'POST').then(function(res) {
      console.log(res.data)
      wx.setStorageSync('advisorId', res.data)
    })
  },
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