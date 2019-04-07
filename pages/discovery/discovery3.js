//discovery.js
var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    //开发环境
    /*imgUrls: [
      'http://res.cloudinary.com/dqjmraldr/image/upload/v1539331031/yptgpcwe73rbxuk43tsi.jpg',
      'http://res.cloudinary.com/dqjmraldr/image/upload/v1539331001/ckj4lrwkj3k0nfd8cvzd.jpg',
      'https://baoxian.enn.cn/xaejb/order/api/static/download?fileId=group1%2FM00%2F07%2FCC%2FCiWTpVwAhrCAL_CxAAPE9cg13iU465.jpg'
    ],*/
    //测试环境
    imgUrls: [
      app.globalData.fileUrl + 'group1/M00/00/00/CiWSS1xGky-ALG8hAAJ2UBqULCY279.jpg',
      app.globalData.fileUrl + 'group1/M00/00/00/CiWSSlxGp1mAAOY4AALinlWBIyE655.jpg',
      app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSSlw2t2SABD_RAAPE9YYwPEw824.jpg',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    feed_length: 0,
    menu: {
      imgUrls: [
        '../../images/baby.png',
        '../../images/travel.png',
        '../../images/hospital.png',
        '../../images/home.png',
        '../../images/car.png'
        // '../../images/elders.png'
      ],
      descs2: [{
        name: '健康人生',
        code: 'HEALTHY'
      },
      {
        name: '快乐出行',
        code: 'TRAVEL'
      },
      {
        name: '看病就医',
        code: 'MEDICAL'
      },
      {
        name: '我爱我家',
        code: 'FAMILYPROPERTY'
      },
      {
        name: '保护爱车',
        code: 'CAR'
      }
      ],
      descs: [
        '健康人生',
        '快乐出行',
        '看病就医',
        '我爱我家',
        '关爱长辈',
        '保护爱车'
      ]
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onLoad: function () {
    console.log('onLoad')
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,

              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          if (wx.getStorageSync('enn_openid')) {
            app.globalData.openId = wx.getStorageSync('enn_openid')

          } else {
            that.getOpenid()
          }

        } else {
          wx.navigateTo({
            url: "/pages/authorize/authorize"
          })
        }
      }
    })
  },
  onShow: function () {
  },
  onReady: function () { },
  getOpenid: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.api + app.globalData.channel + 'wechar/login?code=' + res.code,
          data: {},
          success: res => {
            if (res.data.status == "") {
              app.globalData.openId = res.data.openId;
              wx.setStorageSync('enn_openid', res.data.openId)
              console.log(wx.getStorageSync('enn_openid'))
            } else {
              that.getOpenid();
            }
          }
        })
      }
    })
  },
  bindItemTap: function (res) {
    var code = res.currentTarget.dataset.code
    wx.navigateTo({
      url: '../product/list/list?wechatInsuranceProductType=' + code
    })
  },
  toProtectPlan: function () {
    wx.navigateTo({
      url: '../product/protectplan/index'
    })
  },
  toPremiumCalc: function () {
    wx.navigateTo({
      url: '../product/premiumcalc/premiumcalc',
    })
  },
  toCompare: function () {
    wx.navigateTo({
      url: '../product/choose/choose'
    })
  },
  bindQueTap: function () {
    wx.navigateTo({
      url: '../product/assist/index'
    })
  },

});