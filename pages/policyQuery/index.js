var app = getApp()
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var moment = require('../../utils/moment.js')
Page({
  data: {
    showTopTips: false,
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    isAgree: false,
    errmsg: '信息填写错误',
    //AdvisorList
    policyList: [],
  },
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit: function(e) {
    console.log(e.detail.value)
    var that = this;
    //policyholderName
    if (!e.detail.value.policyholderName) {
      this.setData({
        showTopTips: true,
        errmsg: '投保人姓名为必填'
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
      return;
    }
    if (!e.detail.value.policyholderCertId) {
      this.setData({
        showTopTips: true,
        errmsg: '身份证号为必填'
      });
      setTimeout(function() {
        that.setData({
          showTopTips: false
        });
      }, 3000);
      return;
    }
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(e.detail.value.policyholderCertId)) {
      this.setData({
        showTopTips: true,
        errmsg: '身份证号填写有误'
      });
      setTimeout(function() {
        that.setData({
          showTopTips: false
        });
      }, 3000);
      return false;
    }
    var reg = /^1[0-9]{10}$/;
    if (e.detail.value.policyholderPhone) {
      if (!reg.test(e.detail.value.policyholderPhone)) {
        this.setData({
          showTopTips: true,
          errmsg: '手机号填写有误'
        });
        setTimeout(function() {
          that.setData({
            showTopTips: false
          });
        }, 3000);
        return false;
      }
    }
    var mdataJson = JSON.stringify(e.detail.value)
    wx.navigateTo({
      url: '/pages/policys/index?mdataJson=' + mdataJson,
    })
  },
  
});