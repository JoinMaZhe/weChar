var app = getApp()
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
Page({
  data: {
    motto: '微信小程序版',
    userInfo: {},
    article: {},
    id: null,
    url: app.globalData.fileUrl
  },
  onLoad: function(options) {
    //  console.log('onLoad')
    var that = this
    var id=options.id
    var url = api.TopicDetail+id
    //调用应用实例的方法获取全局数据
    util.request(url, {}, 'GET').then(function (res) {
        var entity = res.data;
        if (entity == undefined) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            article: entity,
            id: id

          });
        }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '文章',
      desc: '快来看看',
      path: '/pages/article/detial/detial?id='+this.data.id
    }
  }

})