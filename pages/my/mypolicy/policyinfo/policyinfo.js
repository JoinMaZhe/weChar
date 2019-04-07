// pages/my/mypolicy/policyinfo/policyinfo.js
var util = require('../../../../utils/util.js')
var api = require('../../../../utils/api.js')
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    src: '../../../../images/myadvisor2x.png',
    hidden: true,
    advisorId: '',
    myadvisor: [],
    mdata:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //调用应用实例的方法获取全局数据
    //var url = api.OrderDetail + options.id
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
          mdata: entity
        });
        util.request(api.AdvisorInfo + entity.salePersonId, {}, 'GET').then(function (res) {
          var adv = res.data;
          if (adv == undefined) {
            var toastText = '获取数据失败';
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {
            that.setData({
              myadvisor: adv,
              advisorId: app.globalData.advisorId,
            });
          }
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  // 理赔协助
  feedBackEvent: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../feedback/feedback?id=' + ds.id + '&orderid=' + ds.orderid,
    })
  },

  // 一键续保
  oneKeyEvent: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({

      url: '../../onekeyrenewal/onekeyrenewal?id=' + ds.hid +
        '&productid=' + ds.pid + '&orderid=' + ds.orderid,
    })
  },

  call(e) {

    var phoneNum = "";
    if (app.globalData.advisorId == "000") {
      phoneNum = "4006058000";
    } else {
      phoneNum = this.data.myadvisor.saleTel;
    }
    console.log("经纪人电话号码为：", phoneNum)
    wx.makePhoneCall({
      phoneNumber: phoneNum,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }

    })
  },
  cancelOrder(event) {
    var that = this;
    var polNo = event.currentTarget.dataset.orderid
    var insCpyCode = event.currentTarget.dataset.inscpycode
    console.log(event)
    util.request(api.CancelOrder + polNo + '/' + insCpyCode, 'GET').then(function (res) {
      console.log(res.data.mdata)
      var mdata = res.data.mdata
      if (res.data.code == 200) {
        wx.showModal({
          title: '提示',
          //showCancel: false,
          content: res.data.message,
          confirmColor: '#04ACD4',
          success(res) {
            if (res.confirm) {
              var amount = mdata.surrenderAmount
              var strs = amount.split("=");
              //amount.SubString(indexStart);
              console.log(strs)
              if (strs.length > 1) {
                var money = strs[1]
              } else {
                var money = strs[0]
              }
              wx.navigateTo({
                url: '../policycancellation/index?code=' + that.data.mdata.polNo + '&amount=' + money
              })
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showModal({
          title: '',
          showCancel: false,
          content: res.data.message,
          confirmColor: '#04ACD4',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    
    })
  }


})