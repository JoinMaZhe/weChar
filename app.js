//app.js
var util = require('./utils/util.js');
var api = require('./utils/api.js');
var user = require('./utils/user.js');
App({
  onLaunch: function() {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.setStorageSync('advisorId', '000')
    //wx.setStorageSync('isAdvisor', '1')
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('userInfo', res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              that.globalData.hasLogin = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          that.globalData.hasLogin = false;
        }
      },
    })
  },
  goStartIndexPage: function() {
    setTimeout(function() {
      wx.redirectTo({
        url: "/pages/start/start"
      })
    }, 1000)
  },
  onShow: function() {
  },
  globalData: {
    mallName: "新奥保险服务",
    isConnected: true, // 网络是否连接
    hasLogin: false,
    userInfo: null,
    advisorId: '0',
    isAdvisor: '1',
    openId: '',
    /*api: 'http://10.37.147.167:8094',*/
    //开发
    //api: 'https://baoxian.enn.cn/xaejb',
    //测试
    api: 'https://baoxian.enn.cn/xaejbtest',
    // api: 'http://10.37.146.76:9602/xaejb',
    fileUrl: 'https://baoxian.enn.cn/xaejbtest/order/api/static/download?fileId=',
    //测试fileUrl
    //fileUrl: 'http://10.37.146.76:9602/xaejb/order/api/static/download?fileId=',
    advisorweb: '/advisor/api/web/advisor/',
    advisor: '/advisor/api/advisor/',
    order: '/order/api/',
    oss: '/oss/api/',
    pms: '/pms/api/',
    channel: '/channel/api/',
  }
})