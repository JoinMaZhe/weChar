// pages/my/collect/collect.js
// pages/article/list/list.js
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
const app = getApp()
Page({
  data: {
    list: [],
    product: '',
    productsCollected: [],
    msg: {
      icon: '../../images/empty.png',
      title: '空空如也',
      text: '暂时没有相关数据',
      buttons: [{
        text: '随便逛逛',
      }],
    },
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onLoad: function() {
    console.log('onLoad')
    // 从缓存中读取所有的缓存状态
    var productsCollected = wx.getStorageSync('productscollected')
    console.log(productsCollected)
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = api.ProductList
    util.request(url, {}, 'GET').then(function (res) {
      wx.hideLoading();
      var list = res.data;
      if (list == null) {
        var toastText = '获取数据失败' + res.data.errMsg;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 20000
        });
      } else {

        for (var i = 0; i < list.length; i++) {
          if (productsCollected[list[i].id] == true) {
            that.data.productsCollected.push(list[i])
          } else { }
        }
        that.setData({
          productsCollected: that.data.productsCollected
        });
      }

    })
  },
  bindItemTap: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../product/detial/detial?id=' + ds.id + '&url=' + ds.url
    })
  },
  upper: function() {
    wx.showNavigationBarLoading()
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  buttonClicked(e) {
    console.log(e)
    wx.switchTab({
      url: '../../discovery/discovery'
    })
  },
})