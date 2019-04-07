// pages/my/mypolicy/policycancellation/index.js
var util = require('../../../../utils/util.js')
var api = require('../../../../utils/api.js')
var moment = require('../../../../utils/moment.js')
Page({
  data: {
    showTopTips: false,
    policy: null,
    date: "2016-09-01",
    validDate:'',
    bank:'',
    amount:'',
    errormsg:''
  },
  onLoad(options) {
    var that = this
    var date = new Date();
    var start = moment(util.formatTime(date)).add(1, 'days').locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
    console.log(options);
    
    //console.log((options.amount / 100).toFixed(2));
    //调用应用实例的方法获取全局数据
    var url = api.OrderDetailByCode + options.code
    util.request(url, {}, 'GET').then(function(res) {
      var entity = res.data.mdata;
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
          policy: entity,
          validDate: start,
          amount: (options.amount / 100).toFixed(2)
        });
      }
    })
  },
  getBankCodeName(e){
    //BankCodeName
    var that = this
     var url = api.BankCodeName + '中国'
    //var url = 'http://10.37.146.75:9603/api/web/order/getbankcodename?name=中国'
    wx.navigateTo({
      url: '/pages/search/index'
    })
    return;
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
  formSubmit(e) {
    var that = this;
    var formdata = e.detail.value
    if (!formdata.account){
      this.setData({
        showTopTips: true,
        errormsg:'银行卡账户不为空'
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
      return;
    }
    console.log(e.detail.value)
    var data={
      "account": formdata.account,
      "branchAccount": formdata.branchAccount,
      "channelCode": formdata.channelCode,
      "orderNo": formdata.orderNo,
      "payeeBankCode": formdata.payeeBankCode,
      "surrenderAmout": formdata.surrenderAmout,
    }
    util.request(api.CancelPolicy, data, 'POST').then(function(res) {
      console.log(res)
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: res.message,
        confirmColor: '#04ACD4',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  
});