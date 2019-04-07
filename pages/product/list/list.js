// pages/product/list/list.js
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
const app = getApp()
Page({
  data: {
    active3: [],
    showHidden: false,
    // imgurl: app.globalData.fileUrl,
    imgurl: app.globalData.fileUrl,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    insuranceCompanyList: [],
    product: '',
    feed_length: 0,
    items: [{
        type: 'sort',
        label: '价格',
        value: 'stars',
        groups: ['001'],
      },
      {
        type: 'text',
        label: '保险公司',
        value: 'forks',
        groups: ['002'],
      }

    ],
    collected: false,
    msg: {
      icon: '../../images/empty.png',
      title: '空空如也',
      text: '暂时没有相关数据',
    },
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onLoad: function(res) {
    console.log('onLoad' + res.id)
    console.log('onLoad')
    var that = this
    var url = ''
    if (res.wechatInsuranceProductType == "undefined") {
      url = api.ProductList
    } else {
      url = api.ProductCategory+ '?wechatInsuranceProductType=' + res.wechatInsuranceProductType
    }
    wx.showLoading({
      title: '加载中',
    })
    util.request(url, {}, 'GET').then(function(res) {
        wx.hideLoading();
        var list = res.data;
        if (list == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 20000
          });
        } else {
          var reg = '^[\u4e00-\u9fa5]{0,}$'
          var insuranceCompanyList = that.data.insuranceCompanyList
          var obj = {}
          var products = []
          for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < list[i].onePlanLiability.length; j++) {
              if (!list[i].onePlanLiability[j].amount.match(reg)) {
                list[i].onePlanLiability[j].amount = list[i].onePlanLiability[j].amount + '元'
              } else {
                list[i].onePlanLiability[j].amount = list[i].onePlanLiability[j].amount
              }

            }
            if (insuranceCompanyList.length == 0) {
              var obj = {}
              var products = []
              obj.name = list[i].insuranceCompany.shortName
              obj.photo = list[i].insuranceCompany.picture[0].url
              obj.code = list[i].insuranceCompany.companyCode
              products.push(list[i])
              obj.products = products
              insuranceCompanyList.push(obj)
            } else {
              for (var k = 0; k < insuranceCompanyList.length; k++) {
                var obj = {}
                var products = []
                if (insuranceCompanyList[k].code == list[i].insuranceCompany.companyCode) {
                  insuranceCompanyList[k].products.push(list[i])
                } else {
                  var obj = {}
                  var products = []
                  obj.name = list[i].insuranceCompany.shortName
                  obj.photo = list[i].insuranceCompany.picture[0].url
                  obj.code = list[i].insuranceCompany.companyCode
                  products.push(list[i])
                  obj.products = products
                  insuranceCompanyList.push(obj)
                }
                break;

              }

            }
          }
          console.log(insuranceCompanyList)
          that.setData({
            list: list,
            insuranceCompanyList: insuranceCompanyList
          });
        }


      }

    )
  },
  bindItemTap: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../product/detial/detial?id=' + ds.id + '&url=' + ds.url
    })
  },
  upper: function() {
    wx.showNavigationBarLoading()
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  onShareAppMessage: function() {
    return {
      title: '这里是机智life小程序',
      path: '/pages/product/list/list?id=' + wx.getStorageSync('openId'),
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
    }
  },

  compare: function(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },
  compare1: function(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },
  asciSort: function(obj) {
    return function(a, b) {
      var obj1 = a[obj];
      var obj2 = b[obj];

      var num = 0;
      var arr = new Array(); //种子数组
      for (var i = 0; i < obj2.length; i++) {
        arr[i] = obj2.substr(i, 1);
        num = num + arr[i].charCodeAt();
      }

      var arr1 = new Array();
      var num1 = 0;
      for (var i = 0; i < obj1.length; i++) {
        arr1[i] = obj1.substr(i, 1);
        num1 = num1 + arr1[i].charCodeAt();
      }
      console.log(num - num1);
      return num - num1;
    }
  },

  onChange(e) {
    console.log(e.detail);
    const {
      checkedItems,
      items
    } = e.detail
    const params = {}
    const list = this.data.list
    const insuranceCompanyList = this.data.insuranceCompanyList
    console.log(checkedItems, items)
    checkedItems.forEach((n) => {
      console.log(list)
      if (n.checked) {
        if (n.value === 'stars') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
          console.log(params.order)
          if (params.order == 'asc') {
            list.sort(this.compare('price'))
            this.setData({
              list: list,
              showHidden: true
            });
          } else if (params.order == 'desc') {
            list.sort(this.compare1('price'))
            this.setData({
              list: list,
              showHidden: true
            });
          }
        } else if (n.value === 'forks') {
          params.sort = n.value
          insuranceCompanyList.sort(this.asciSort('name'))
          this.setData({
            insuranceCompanyList: insuranceCompanyList,
            showHidden: false
          });

        }
      }
    })
  },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
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
      list: list,
      showHidden: true
    })
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
  onCollectionTap: function(event) {
    var that = this
    var list = that.data.list
    // 从缓存中读取所有的缓存状态
    var productsCollected = wx.getStorageSync('productscollected')
    var productCollectedId = event.currentTarget.dataset.id
    var collected = productsCollected[productCollectedId]
    collected = !collected
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == productCollectedId) {
        //将是否被收藏的状态上绑定到collected这个变量上
        list[i].collected = collected
      } else {
        list[i].collected = list[i].collected
      }
    }
    productsCollected[productCollectedId] = collected
    wx.setStorageSync("productscollected", productsCollected)
    that.setData({
      list: that.data.list
    })
    console.log('onCancel', event)
  },
  onChange2(event) {
    const {
      key
    } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  }


})