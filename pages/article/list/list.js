var app = getApp()
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')

Page({
  data: {
    navTab: [],
    currentNavtab: "0",
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    category: null,
    articlelist: [],
    url: app.globalData.fileUrl
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getCategory();

  },
  getCategory: function() {
    var that = this
    var url = api.CatalogList
    wx.showLoading({
      title: '加载中',
    })
    util.request(url, {}, 'GET').then(function(res) {
      console.log(res)
      var list = res.data;
      if (list == null) {
        var toastText = '获取数据失败' + res.data.errMsg;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        that.setData({
          navTab: list,
          category: list[0].code
        });
        that.getArticle(that.data.category)
      }

    })
  },
  getArticle: function(category) {
    var that = this
    var url = api.TopicList + '?category=' + category + '&pageIndex=0'
    util.request(url, {}, 'GET').then(function(res) {
      wx.hideLoading();
      var list = res.data;
      if (list == null) {
        var toastText = '获取数据失败' + res.data.errMsg;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        for (var i = 0; i < list.content.length; i++) {
          list.content[i].intro = list.content[i].url.substring(12, 40);

        }
        that.setData({
          feed: list
        });
      }

    })
  },
  switchTab: function(e) {
    var code = e.currentTarget.dataset.code
    var that = this
    var url = api.TopicList + '?category=' + code + '&pageIndex=0'
    wx.showLoading({
      title: '加载中',
    })
    util.request(url, {}, 'GET').then(function(res) {
      wx.hideLoading();
      console.log(res)
      var list = res.data;
      if (list == null) {
        var toastText = '获取数据失败' + res.data.errMsg;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        for (var i = 0; i < list.content.length; i++) {
          list.content[i].intro = list.content[i].url.substring(12, 40);

        }
        that.setData({
          articlelist: list,
          currentNavtab: e.currentTarget.dataset.idx
        });
      }
    })
  },

  bindItemTap: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../article/detial/detial?id=' + ds.id
    })
  },

  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  lower: function(e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
    console.log("lower")
  }
});