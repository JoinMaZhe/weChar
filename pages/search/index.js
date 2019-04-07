var util = require('../../utils/util.js')
var user = require('../../utils/user.js')
var api = require('../../utils/api.js')
var moment = require('../../utils/moment.js')
var work = require('../../utils/work.js')
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    banks:[]
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.getBankCodeNames(e.detail.value)
  },
  getBankCodeNames(e) {
    //BankCodeName
    var that = this
    var url = api.BankCodeName + e
    util.request(url, {}, 'POST').then(function (res) {
      console.log(res)
      var entity = res.mdata;
      //var adv = res.data.data.mdata.saleVM;
      if (entity == undefined) {
        var toastText = '获取数据失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 1500
        });
      } else {
        that.setData({
          banks: entity
        });
      }
    })
  },
  getBankCodeName(e){
    console.log(e.currentTarget.dataset)
    var data = e.currentTarget.dataset
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      bank: { name: data.name, code: data.code }
    })
    wx.navigateBack({
      delta: 1
    })
  }
});
