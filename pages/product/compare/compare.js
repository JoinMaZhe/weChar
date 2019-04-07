//获取应用实例
var app = getApp();
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
Page({
  data: {
    url: app.globalData.fileUrl,
    imgurl: app.globalData.fileUrl,
    navigate_type: '', //分类类型，是否包含二级分类
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: false,
    slideRatio: '',
    productIdList: [],
    onePlanLiability: []
  },
  onLoad: function(options) {
    var that = this;
    var systemInfo = wx.getSystemInfoSync();
    util.request(api.ComperProductList, JSON.parse(options.productIdList), 'POST').then(function(res) {
      console.log(res);
      console.log(res.data.length)
      for (var int = 0; int < res.data.length; int++) {
        if (res.data[int].onePlanLiability.length > 4) {
          var onePlanLiability = [];
          for (var j = 0; j < 4; j++) {
            onePlanLiability[j] = res.data[int].onePlanLiability[j]
          }
          res.data[int].onePlanLiability = onePlanLiability
        }
        console.log(res.data[int].onePlanLiability.length)
      }
      that.setData({
        productIdList: res.data
      })
    })
    that.setData({
      // list: _list,
      windowHeight: app.globalData.navigate_type == 1 ? systemInfo.windowHeight : systemInfo.windowHeight - 35,
      windowWidth: systemInfo.windowWidth,
      //  navigate_type: app.globalData.navigate_type
    })

  },
  //根据分类获取比例
  getRatio() {
    var self = this;
    if (!self.data.tlist[self.data.currentTab].secondList || self.data.tlist[self.data.currentTab].secondList.length <= 5) {
      this.setData({
        slideShow: false
      })
    } else {
      var _totalLength = self.data.tlist[self.data.currentTab].secondList.length * 150; //分类列表总长度
      var _ratio = 230 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
      var _showLength = 750 / _totalLength * 230; //当前显示红色滑条的长度(保留两位小数)
      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  //slideLeft动态变化
  getleft(e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
  },
  downloadFile: function (e) {
    var fileurl = e.currentTarget.dataset.url
    var url = this.data.url + fileurl
    console.log(url)
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
})