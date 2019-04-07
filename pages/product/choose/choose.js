// pages/product/choose/choose.js
var app = getApp()
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    value2: [],
    value: '',
    hidden: false,
    count: 0

  },

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  onChange(field, e) {
    const {
      value
    } = e.detail
    const data = this.data[field]
    const index = data.indexOf(value)
    const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

    this.setData({
      [field]: current,
    })

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  onChange2(e) {
    this.onChange('value2', e)
  },

  formSubmit() {
    var arr = new Array();
    if (this.data.count < 2) {
      wx.showToast({
        title: '选择两个产品进行对比',
        icon: 'none'
      })
      return
    }
    for (let i = 0, len = this.data.list.length; i < len; i++) {
      if (this.data.list[i].checked) {
        arr.push(this.data.list[i].id);
      }
    }
    console.log('form发生了submit事件，携带数据为：', arr)
    wx.navigateTo({
      url: '../compare/compare?productIdList=' + JSON.stringify(arr)
      // url: '../product-compare/product-compare'
    })
  },

  bindCheckbox: function(e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var count = 0;
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var checked = this.data.list[index].checked;
    var list = this.data.list;

    // 对勾选状态取反
    list[index].checked = !checked;
    for (let i = 0, len = this.data.list.length; i < len; i++) {
      if (this.data.list[i].checked) {
        count++
      }
    }
    if (count > 2) {
      wx.showToast({
        title: '只能选择两个产品进行对比',
        icon:'none'
      })
      return
    }

    // 写回经点击修改后的数组
    this.setData({
      count: count,
      list: list
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log('onLoad')
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = api.ProductList
    util.request(url, {}, 'GET').then(function(res) {
      wx.hideLoading();
      var list = res.data;
      if (list == null) {
        var toastText = '获取数据失败' + res.errMsg;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        for (let i = 0, len = list.length; i < len; i++) {
          list[i].checked = false;
        }
        that.setData({
          list: list
        });
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

  toCompareList: function() {
    var arr = [
      "5b7d1d2d7ba8c3b40c8e4aae", "5b8f4b153d5312834b82f78c"
    ];
    wx.navigateTo({
      url: '../compare2/compare2?productIdList=' + JSON.stringify(arr)
    })
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
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
    var list = this.data.list
    console.log(e.detail.value)
    var len = list.length;
    var arr = [];
    //keyWord
    var reg = new RegExp(e.detail.value);
    for (var i = 0; i < len; i++) {
      //如果字符串中不包含目标字符会返回-1
      if (list[i].name.match(reg)) {
        list[i].hidden = false
        // arr.push(list[i]);
      } else {
        list[i].hidden = true
      }
    }
    console.log(arr)
    this.setData({
      list: list
    })
    return arr;
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      value: '',
    })
  },
  onCancel(e) {
    console.log('onCancel', e)
  },

})