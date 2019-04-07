var app = getApp()
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
Page({
  data: {
    dayNum: '0',
    dayPremium: '0',
    weekNum: '0',
    weekPremium: '0',
    monthNum: '0',
    monthPremium: '0',
    listData: [
    ]
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //AdvisorAchievement
    util.request(api.AdvisorAchievement + app.globalData.advisorId, {}, 'GET').then(function(res) {
      var list = res.data;
      if (list == null) {
        var toastText = '获取数据失败,请稍后再试';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {

        that.setData({
          dayNum: list.dayNum,
          dayPremium: list.dayPremium,

          weekNum: list.workNum,
          weekPremium: list.workPremium,
          monthNum: list.monthNum,
          monthPremium: list.monthPremium,
        });

      }



    })
  }

})