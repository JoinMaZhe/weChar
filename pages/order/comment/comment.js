var app = getApp();
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')

Page({

  data: {
    productName:'',
    comment:{
      id:'',
      orderId:'',
      policyId:'',
      openId:'',
      productGrade:5,
      serviceGrade:0,
      otherGrade:0,
      detail:'',
    },
  },

  onLoad: function (options) {
    var that=this;
    // ds.product + '&polNo=' + ds.polno + '&orderId=' + ds.orderid
    console.log("comment options", options);
    var comment=that.data.comment;
    util.request(api.getOrderComment + '?policyId=' + options.orderId, 'POST').then(function (res) {
      console.log("==getOrderComment response==:", res);
      if (res.code == 200) {
        comment = res.data;
        comment.productGrade = parseInt(res.data.productGrade);
        comment.serviceGrade = parseInt(res.data.serviceGrade);
        comment.otherGrade = parseInt(res.data.otherGrade);
      }
      comment.orderId = options.polNo;
      comment.policyId = options.orderId;
      comment.openId = app.globalData.openId;
      that.setData({
        productName: options.productName,
        comment: comment,

      });
      console.log("=============", that.data.comment);
    });


  },

  formSubmit: function(e) {
    if (this.data.comment.serviceGrade == 0) {
      wx.showModal({
        content: '请对服务态度进行评分',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            return
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    if (this.data.comment.otherGrade == 0) {
      wx.showModal({
        content: '请对其他服务进行评分',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            return
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    console.log("comment e",e.detail.value);
    console.log("comment post:", this.data.comment);
    util.request(api.OrderCommentSave, this.data.comment, 'POST').then(function(res) {
      if (res == null || res.data == null) {
        console.error('网络请求失败');
        return;
      }
      var premium = res.msg;
      wx.showModal({
        content: premium,
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../discovery/discovery',
            })
          } else if (res.cancel) {
          }
        }
      })
    })
  },

  setProductGrade: function (e) {
    this.data.comment.productGrade=e.detail.value;
    this.setData({
      comment: this.data.comment
    })
  },

  setOtherGrade: function (e) {
    this.data.comment.otherGrade=e.detail.value;
    this.setData({
      comment: this.data.comment
    })
  },

  setServiceGrade:function (e) {
    this.data.comment.serviceGrade = e.detail.value;
    this.setData({
      comment: this.data.comment
    })
  },

  onBlur:function (e) {
    console.log(e.detail.value);
    this.data.comment.detail=e.detail.value;
    this.setData({
      comment: this.data.comment
    })
  }
});
