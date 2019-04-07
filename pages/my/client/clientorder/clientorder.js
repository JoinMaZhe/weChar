var app = getApp()
var util = require('../../../../utils/util.js')
var api = require('../../../../utils/api.js')
Page({
  data: {
    listData: [],

    certId: '',
  },



  onLoad: function(options) {
    console.log("身份证号是" + options.certid)
    this.setData({
      certId: options.certid
    });
    var that = this
    util.request(api.CustomerOrders + options.certid, 'GET').then(function(res) {
      var list = res.data.datalist;
      if (list == null) {
        var toastText = res.data.message;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        for (let i = 0, len = list.length; i < len; i++) {
          // list[i].polNo = list[i].polNo.substring(0, 8) +
          //   '...';
          list[i].isExistPhoneNum = true;
          if (list[i].applyVM == undefined) {
            list[i].isExistPhoneNum = false;
          } else {
            if (list[i].applyVM.applyTel == undefined || list[i].applyVM.applyTel.length == 0) {
              list[i].isExistPhoneNum = false;
            }
          }
        }
        that.setData({
          listData: list
        });
      }

    })
  },



  toInfoTip: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../mypolicy/policyinfo/policyinfo?code=' + ds.code
    })
  },




  call(e) {
    console.log("投保人电话号码为：", e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }

    })
  }





})