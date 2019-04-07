// pages/policys/index.js
var app = getApp()
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var moment = require('../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    msg: {
      icon: '../../images/kong.png',
      title: '空空如也',
      text: '您还没有投过保',
    },
    OrderListWaitRenewal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.showLoading({
      title: '正在加载',
    })

    if (options.mdataJson) {
      var mdata = JSON.parse(options.mdataJson)
      util.request(api.AdvisorList, mdata, 'POST').then(function(res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.content) {
          var list = res.data.content
          if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
              var pickDate = moment(list[i].insureEndTime);
              var diff = pickDate.diff(moment(), 'days'); //相差几天
              if (diff <= 30) {
                list[i].hidden = false;
                list[i].time = diff
              } else {
                list[i].hidden = true;
                list[i].time = diff
              }
            }
            that.setData({
              show: false,
            });
          }
          that.setData({
            policyList: list
          })
        }
      })
    } else {
      app.globalData.openId = wx.getStorageSync('enn_openid')
      util.request(api.OrderListWaitRenewal + app.globalData.openId, 'GET').then(function(res) {
        var lists = res.data;
        if (lists == null) {
          var toastText = res.data.message;
          lists = [];
          that.setData({
            show: true,
          });
        } else {
          for (var i = 0; i < lists.length; i++) {
            var pickDate = moment(lists[i].insureEndTime);
            var diff = pickDate.diff(moment(), 'days'); //相差几天
            if (diff <= 15) {
              lists[i].hidden = false;
              lists[i].time = diff
            } else {
              lists[i].hidden = true;
              lists[i].time = diff
            }
          }
          that.setData({
            show: false,
            OrderListWaitRenewal:true
          });
        }
        wx.hideLoading();
        that.setData({
          policyList: lists,
        });
        console.log(that.data.policyList)
      })
    }

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

  },
  call(event) {
    var url = api.CompanyPhone + event.currentTarget.dataset.code
    util.request(url, 'GET').then(function(res) {
      console.log(res.data.telephone)
      wx.makePhoneCall({
        phoneNumber: res.data.telephone,
        success: function() {
          console.log("拨打电话成功！")
        },
        fail: function() {
          console.log("拨打电话失败！")
        }

      })
    })
  },
  toInfoTip: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../my/mypolicy/policyinfo/policyinfo?code=' + ds.code
    })
  },
})