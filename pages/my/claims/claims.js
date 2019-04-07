var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var app = getApp()
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
    descs2: [{
        name: '健康人生',
        label: '新奥能源',
      code: 'FAMILYPROPERTY'
      },
      {
        name: '健康人生',
        label: '新绎健康',
        code: 'MEDICAL'
      },
      {
        name: '快乐出行',
        label: '新绎旅游',
        code: 'TRAVEL'
      },
      {
        name: '我爱我家',
        label: 'e城e家',
        code: 'FAMILYPROPERTY'
      },

    ],
    descs: [{
      code: 'MEDICAL',
        index: 0,
        lable: '气费代缴-安检服务 20元'
      },
      {
        code: 'MEDICAL',
        index: 1,
        lable: '防灾防损-安检服务 20元'
      },
      {
        code: 'TRAVEL',
        index: 0,
        lable: '乘客意外险-旅游服务 60元'
      },
      {
        code: 'TRAVEL',
        index: 1,
        lable: '综合险-旅游服务 60元'
      },
      {
        code: 'FAMILYPROPERTY',
        index: 0,
        lable: '家财险-家政服务 70元'
      }
    ],
    show: true,
    msg2: {
      icon: '../../images/kong.png',
      title: '空空如也',
      text: '暂时没有相关数据',
      buttons: [{
        text: '随便逛逛',
      }],
    },
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getArticle("FAMILYPROPERTY");

  },
  getArticle: function(category) {
    var that = this
    var url = api.ProductCategory + '?wechatInsuranceProductType=' + category
    wx.showLoading({
      title: '加载中',
    })
    util.request(url, {}, 'GET').then(function(res) {
      wx.hideLoading();
      var list = res.data;
      console.log(list)
      if (list == null) {
        var toastText = '获取数据失败' + res.errMsg;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {

        for (var i = 0; i < list.length; i++) {
          for (var j = 0; j < that.data.descs.length; j++) {
            if (that.data.descs[j].code === list[i].wechatProduct.wechatInsuranceProductType && that.data.descs[j].index === i) {
              list[i].clamslable = that.data.descs[j].lable
              
            }
          }
        }
        console.log(that.data)
        that.setData({
          articlelist: list
        });
      }
    })
  },
  switchTab: function(e) {
    var code = e.currentTarget.dataset.code
    var that = this
    that.getArticle(code);
    that.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  
  },
  bindItemTap: function(e) {
    var ds = e.currentTarget.dataset;
    wx.showModal({
      content: '服务暂未开通',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../../discovery/discovery'
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return;
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
  },
  buttonClicked(){
    wx.switchTab({
      url: '../../discovery/discovery'
    })
  }



});