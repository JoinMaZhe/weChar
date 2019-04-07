//answer.js
var util = require('../../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    entity: {},
    list: [],
    showLoading: true,
   
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: "http://10.37.147.172:7279/api/getcashflowinfo/1",
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
       
        var list = res.data.data;
        console.log(res);
        console.log(res.data);

        if (list == undefined) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
            that.setData({
           
            list:list,
              showLoading: false
            
          });
        }
      }
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
