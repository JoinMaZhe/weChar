//login.js
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    longitude: '',
    latitude: '',
    angle: 0,
    userInfo: {},
    //开发环境
    /*urllist: [{
      name: '《客户告知书》',
      url: 'https://baoxian.enn.cn/xaejb/order/api/static/download?fileId=group1%2FM00%2F07%2FC6%2FCiWTpVvZU6-AD2EfAABcLpzMlnE60.docx'
    }, {
      name: '《保险经纪服务委托协议书》',
      url: 'https://baoxian.enn.cn/xaejb/order/api/static/download?fileId=group1%2FM00%2F07%2FCC%2FCiWTpVv-V3eAff_YAAER-bIkdww392.pdf'
    }, {
      name: '《投保声明书》',
      url: 'https://baoxian.enn.cn/xaejb/order/api/static/download?fileId=group1%2FM00%2F07%2FCB%2FCiWTpVvyW_eAHjbdAAD8RCrL9Tw444.pdf'
    }],*/
    //测试环境
    urllist: [{
      name: '《客户告知书》',
      url: app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSS1w2uI-AHmJ2AABcLgRY7pg04.docx'
    }, {
      name: '《保险经纪服务委托协议书》',
      url: app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSS1w2uMCAUCWFAAER-a_Ks2s457.pdf'
    }, {
      name: '《投保声明书》',
      url: app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSS1w2uOSAfKjaAAD8RIlG7zk868.pdf'
    }],
    isAgree: true
  },
  goToIndex: function() {
    if (app.globalData.isConnected) {
      wx.switchTab({
        url: '/pages/discovery/discovery',
      });
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }

  },
  onLoad: function(query) {
    var that = this
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    if (query.scene) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      const scene = decodeURIComponent(query.scene)
      console.log("scene-advisorid" + scene)
      app.globalData.advisorId = scene
      /* wx.showToast({
         title: '分享的代理人id' + scene,
         icon: 'none',
         duration: 2000
       })*/
    } else {
      console.log("no scene");
    }
    if (username != '' && password != '') {
      app.globalData.advisorId = wx.getStorageSync('advisorId')
    }
    wx.setNavigationBarTitle({
      title: app.globalData.mallName
    })
  },
  onShow: function() {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo')
    var pages = getCurrentPages();
    console.log(wx.getStorageSync('enn_openid'))
    that.setData({
      userInfo: userInfo
    });

  },
  getOpenid: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var url = api.LoginByWeixin + '?code=' + res.code
        util.request(url, {}, 'GET').then(function(res) {
            if (res.status == "") {
              app.globalData.openId = res.openId;
              wx.setStorageSync('enn_openid', res.openId)
              console.log(wx.getStorageSync('enn_openid'))
            } else {
              that.getOpenid();
            }

          }

        )
      }
    })
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(
      function(res) {
        var angle = -(res.x * 30).toFixed(1);
        if (angle > 14) {
          angle = 14;
        } else if (angle < -14) {
          angle = -14;
        }
        if (that.data.angle !== angle) {
          that.setData({
            angle: angle
          });
        }
      });
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length,

    });

  },
  downloadFile: function(e) {
    var url = e.currentTarget.dataset.url
    console.log(url)
    wx.downloadFile({
      url: url,
      success: function(res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
});