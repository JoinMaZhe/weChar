var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    entityInfo: {},
    list: [],
    //开发环境
    // imgurl: app.globalData.fileUrl,
    //测试环境
    imgurl: app.globalData.fileUrl,
    showLoading: true,
    showhidden: true,
    advisorInfo: {}
  },
  onLoad: function() {
    console.log('开始加载的执业信息')
    var that = this;
    var url = api.UserIndex + app.globalData.openId
    util.request(url, {}, 'GET').then(function(res) {
      var entity = res.data;
      if (entity == null) {
        var toastText = '获取数据失败'
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        var advisorInfo = that.data.advisorInfo
        advisorInfo.name = entity.advisorName
        advisorInfo.phone = entity.advisorPhone
        advisorInfo.id = entity.advisorId
        that.setData({
          entityInfo: entity,
          advisorInfo: advisorInfo
        });
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //事件处理函数
  toInfoTip: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../cancelcontract/cancelcontract?id=' + ds.id
    })
  },
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    if (formData.certId == "") {
      wx.showModal({
        content: '身份证信息必填',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            return
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    formData.openId = app.globalData.openId
    formData.advisorId = that.data.advisorInfo.id
    console.log(formData)
    wx.showLoading({
      title: '加载中',
    })
    var url = api.SaveUser + app.globalData.openId
    util.request(url, formData, 'POST').then(function(res) {
      wx.hideLoading();
      var result = res.data;
      if (result != '200') {
        // console.error('网络请求失败');
        wx.showModal({
          content: res.data.message,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              return
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }
      wx.showModal({
        content: '完善信息成功',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    })
  },
  advisorTelInput(e) {
    var that = this
    var advisorInfo = that.data.advisorInfo
    var phone = e.detail.value
    advisorInfo.phone = phone
    that.setData({
      advisorInfo: advisorInfo
    })
  },
  //获取代理人信息
  getAdvisorInfo: function(e) {
    var that = this
    var phone = that.data.advisorInfo.phone
    var url=api.AdvisorInfoByPhone + phone
    util.request(url, formData, 'GET').then(function (res) {
      var advisor = res.data;
      if (advisor == null) {
        var toastText = '获取数据失败'
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        var entityInfo = that.data.entityInfo
        entityInfo.advisorName = advisor.name
        entityInfo.advisorPhone = advisor.phone
        that.setData({
          advisorInfo: advisor,
          entityInfo: entityInfo
        });
      }
    })
  }

})