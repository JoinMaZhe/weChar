const app = getApp()
var api = require('../../../utils/api.js')
Page({
  data: {
    page: 'pages/start/start',
    scene: '000',
    qrcode: '',
    remind: '加载中',
  },
  onLoad: function() {
    var that = this;
    var page = that.data.page
    var isAdvisor = wx.getStorageSync('isAdvisor') || ''
    if (isAdvisor =='0') {
      var scene = wx.getStorageSync('advisorId')
    } else {
      var scene = that.data.scene
    }
    var qrcode =api.QrCode+ '?page=' + page + '&scene=' + scene
    setTimeout(function() {
      that.setData({
        /*setData 是为了模拟服务器传输的数据*/
        qrcode: qrcode,
      })

    }.bind(this), 3000);

  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 4000);
  },
 /* onShareAppMessage: function(res) {
    if (res.from === 'button') {
      console.log(res.target, res)
    }
    if (res.from === 'menu') {
      console.log(res)
    }
    return {
      title: '新奥保险服务',
      path: '/pages/start/start?scene=' + this.data.scene,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
    }
  },*/
  previewImage: function(e) {
    let temp = [];
    temp.push(this.data.qrcode)
    wx.previewImage({

      // 预览的图片http链接 把字符串转数组。
      urls: temp
    })

  }

})