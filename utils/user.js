/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../utils/api.js');

/**
 * Promise封装wx.getSetting
 */
function checkUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: res => {
        resolve(true);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              /* if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              } */
            }
          })
        } else {
          wx.navigateTo({
            url: "/pages/authorize/authorize"
          })
        }
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {

  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      var url = api.LoginByWeixin + '?code=' + res.code
      //登录远程服务器
      util.request(url, {}, 'GET').then(res => {
        if (res.status == "" ) {
          //存储用户信息
          wx.setStorageSync('enn_openid', res.openId)
          wx.setStorageSync('userInfo', userInfo);
          //wx.setStorageSync('token', res.data.token);
          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo')) {
      checkUserInfo().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};