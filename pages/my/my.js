//logs.js
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var user = require('../../utils/user.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    hiddenmodalput: false,
    password: "",
    phoneNum: '',
    showModal: false,
    advisorId: app.globalData.advisorId, //wx.getStorageSync('advisorId'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    username: '',
    password: '',
    showhidden: true,
    type:'',
  },
  onLoad: function() {
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
      return;
    }
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
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
          wx.setStorageSync('userInfo', res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    var userInfo = wx.getStorageSync('userInfo')
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    this.setData({
      username: username,
      password: password,
      userInfo: userInfo
    })
    if (username != '' && password != '') {
      this.setData({
        showhidden: false,
        type:'out'
      })
    } else {
      this.setData({
        showhidden: true,
        type: 'login'
      })
    }
    if (wx.getStorageSync('enn_openid')) {
      app.globalData.openId = wx.getStorageSync('enn_openid');
    } else {
      user.loginByWeixin(true).then(res => {
        app.globalData.hasLogin = true;
        app.globalData.openId = res.openId;
        console.log(wx.getStorageSync('enn_openid'))
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
  doNotMove: function() {
    console.log('stop user scroll it!');
    return;
  },
  submit: function() {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function() {

  },
  onChange1(event) {
    this.setData({
      username: event.detail
    })
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      password: event.detail
    })
  },
  confirmM: function() {
    console.log("姓名：" + this.data.username + "  电话：" + this.data.password);
    console.log("openId：" + app.globalData.openId); //wx.getStorageSync('openId'));
    //AdvisorLogin
    var phone = this.data.username
    var passWord = this.data.password
    var that = this
    util.request(api.AdvisorLogin, {
      userName: this.data.username,
      password: this.data.password,
      openId: app.globalData.openId
    }, 'POST').then(function(res) {
      if (res.data.code == "200") {
        console.log(res.data.advisorId);
        app.globalData.advisorId = res.data.advisorId
        app.globalData.isAdvisor = '0'
        wx.setStorageSync('advisorId', res.data.advisorId)
        wx.setStorageSync('isAdvisor', '0')
        if (phone != '' && passWord != '') {
          //调用API向本地缓存存入数据
          var username = wx.getStorageSync('username') || ''
          username = phone
          wx.setStorageSync('username', username)
          var password = wx.getStorageSync('password') || ''
          password = passWord
          wx.setStorageSync('password', password)
        }

        // wx.setStorageSync('advisorId', res.data.data.advisorId)
        wx.showToast({
          title: 'success',
        }) 
        that.setData({
          showhidden: false,
          type:'out'
        })
        wx.navigateBack(1);
      } else {
        wx.showModal({
          content: res.data.msg + "请重新登录",
          showCancel: false,
          show: true,
          success: function success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
        return;
      }
    })
  },
  onClose(event) {
    if (event.detail === 'confirm') {
      this.confirmM()
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
  },
  showCustomDialog() {
    this.setData({
      show: true
    });
  },
  hiddenCustomDialog() {
    var that = this;
    //app.globalData.advisorId='000'
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('username');
          wx.removeStorageSync('password');
          wx.setStorageSync('advisorId', '000')
          wx.setStorageSync('isAdvisor', '1')
          var username = wx.getStorageSync('username')
          var password = wx.getStorageSync('password')
          that.setData({
            showhidden: true,
            type:'login'
          })
          //AdvisorLoginOut
          var url = api.AdvisorLoginOut + app.globalData.openId
          util.request(url, {}, 'GET').then(function(res) {
            console.log('退出登录')
          })

        }
      }
    })


  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  call(e) {
    // console.log("投保人电话号码为：", e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: "4006058000",
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }

    })
  },
  onTap(e){
    console.log(e.currentTarget.dataset.type)
    var type = e.currentTarget.dataset.type
    if (type==='login'){
      this.setData({
        show: true
      });
    }else{
      this.hiddenCustomDialog()
    }
  }

})