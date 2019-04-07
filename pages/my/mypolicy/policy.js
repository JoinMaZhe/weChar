// pages/my/mypolicy/policy.js
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var moment = require('../../../utils/moment.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    list: [],
    ensureTime: '',
    src: '../../../images/taikang.png',
    mode: 'widthFix',
    show: true,
    msg1: {
      title: '空空如也',
      text: '暂时没有相关数据',
    },
    msg2: {
      icon: '../../images/iconfont-order.png',
      title: '您还没有相关的订单',
      text: '可以去看看',
      buttons: [{
        text: '随便逛逛',
      }],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var list = that.data.list
    console.log('openId' + app.globalData.openId)
    util.request(api.OrderList + '?advisorId=' + app.globalData.advisorId + '&openId=' + app.globalData.openId, 'GET').then(function(res) {
      var orderlists = res.data.datalist;
      if (orderlists == null) {
        var toastText = res.data.message;
        orderlists = [];
        list[0] = orderlists
      } else {
        list[0] = orderlists
      }
      that.setData({
        list: list,
      });
    })
    util.request(api.PolicyList + '?advisorId=' + app.globalData.advisorId + '&openId=' + app.globalData.openId, 'GET').then(function(res) {
      var lists = res.data.datalist;
      if (lists == null) {
        var toastText = res.data.message;
        lists = [];
        list[1] = lists
      } else {
        for (var i = 0; i < lists.length; i++) {
          var pickDate = moment(lists[i].insureEndTime);
          var diff = pickDate.diff(moment(), 'days'); //相差几天
          if (diff <= 30) {
            lists[i].hidden = false;
            lists[i].time = diff
          } else {
            lists[i].hidden = true;
            lists[i].time = diff
          }
          list[1] = lists
        }
      }
      that.setData({
        list: that.data.list,
      });
      console.log(that.data.list)
    })
  },
  onChange(e) {
    console.log(e)
    if (e.detail.key === 0) {
      this.setData({
        show: true,
      })
    } else if (e.detail.key === 1) {
      this.setData({
        show: false,
      })
    }

    this.setData({
      current: e.detail.key,
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
    console.log(this.route)

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


  // toInfoTip: function () {
  //   var that = this;
  //   wx.navigateTo({
  //     url: '../list/list',
  //   })
  //   this.setData({
  //     showTopTips: true
  //   });
  //   setTimeout(function () {
  //     that.setData({
  //       showTopTips: false
  //     });
  //   }, 3000);
  // }

  toInfoTip: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: 'policyinfo/policyinfo?code=' + ds.code
    })
  },

  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function (userInfo) {
  //     //更新数据
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //   })
  // },
  buttonClicked(e) {
    console.log(e)
    wx.switchTab({
      url: '../../discovery/discovery'
    })
  },
  call(event) {
    var url = api.CompanyPhone + event.currentTarget.dataset.code
    util.request(url, 'GET').then(function(res) {
      console.log(res.data.telephone)
      wx.makePhoneCall({
        phoneNumber: res.data.telephone,
        success: function() {
          console.log("拨打电话成功！")
        },
        fail: function() {
          console.log("拨打电话失败！")
        }

      })
    })
  },

  goComment: function(e) {
    var ds = e.currentTarget.dataset;
    console.log("to comment", ds);
    wx.navigateTo({
      url: '../../order/comment/comment?productName=' + ds.product + '&polNo=' + ds.polno + '&orderId=' + ds.orderid
    })
  },
  // 退保接口
  cancelOrder(event) {
    var that = this;
    var polNo = event.currentTarget.dataset.polno
    var insCpyCode = event.currentTarget.dataset.inscpycode
    console.log(event)
    util.request(api.CancelOrder + polNo + "/" + insCpyCode, 'GET').then(function (res) {
      console.log(res.data.mdata)
      var mdata = res.data.mdata
      if (res.data.code==200){
        wx.showModal({
          title: '',
          //showCancel: false,
          content: '退保试算' + mdata.message,
          confirmColor: '#04ACD4',
          success(res) {
            if (res.confirm) {
              var amount = mdata.surrenderAmount
              var strs = amount.split("=");
              //amount.SubString(indexStart);
              console.log(strs)
              var money = strs[1]
              wx.navigateTo({
                url: '../../policycancellation/index?code=' + that.data.mdata.polNo + '&amount=' + money
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
    /*util.request(api.CancelOrder + polNo, 'GET').then(function (res) {
      console.log(res)
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: res.mdata.msg,
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
    wx.navigateTo({
      url: '../mypolicy/policycancellation/index?code=' + polNo
    })*/
    //CancelOrder
    return;
    wx.showModal({
      title: '',
      content: '暂未开放',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          return;
        } else if (res.cancel) {
          return;
          console.log('用户点击取消')
        }
      }
    })
    return;
  }

})