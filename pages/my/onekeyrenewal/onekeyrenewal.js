// pages/insure/index.js
import {
  $wuxSelect
} from '../../../dist/index'
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var moment = require('../../../utils/moment.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    orderinfo: [],
    insurelist: [],
    showTopTips: false,
    productplan: [],
    productplanid: '',

    startDate: '',
    endDate: '',
    curNav: 0,
    curIndex: 0,
    radioItems: [{
        name: '男',
        value: '0'
      },
      {
        name: '女',
        value: '1',
        checked: true
      }
    ],
    radioItems2: [{
        name: '有',
        value: '0'
      },
      {
        name: '无',
        value: '1',
        checked: true
      }
    ],
    radioItemsID: [{
        name: '身份证',
        value: '0'
      },
      {
        name: '护照',
        value: '1',
        checked: true
      },
      {
        name: '军人证',
        value: '3'
      },
    ],
    radioItems0: [],
    radioItems1: [],
    radioItems3: [],
    radioItems4: [],
    radioItems5: [],
    radioItems6: [],

    date: "2016-09-01",
    time: "12:01",
    date1: "2016-09-01",
    date2: "2016-09-01",
    date3: "2016-09-01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    product: null,
    value1: '',
    title1: '',
    value2: '',
    title2: '',
    value3: '',
    title3: '',
    startDate: '',
  },
  onLoad: function(options) {
    var that = this;
    var date = new Date();
    var start = moment(util.formatTime(date)).add(1, 'days').locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
    console.log(start);
    var end = moment(util.formatTime(date)).add(1, 'years').format('YYYY-MM-DD HH:mm:ss')
    console.log(moment(util.formatTime(date)).add(1, 'years').format('YYYY-MM-DD HH:mm:ss'));
    console.log(util.formatTime(date));

    that.setData({
      startDate: start,
      endDate: end
    })
    //调用应用实例的方法获取全局数据
    this.productDetial(options.productid);
    var that = this
    //调用应用实例的方法获取全局数据
    util.request(api.OrderDetail + options.orderid, {}, 'GET').then(function(res) {
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
          orderinfo: entity,
          productplanid: res.data.mdata.suiteId,
          insurelist: res.data.mdata.insuredVMS,

        });
        that.planDetial(options.productid, res.data.mdata.suiteId)
      }
    })

  },
  productDetial: function(options) {
    var that = this
    util.request(api.ProductDetail + options, {}, 'GET').then(function(res) {
      var product = res.data;
      if (product == undefined) {
        var toastText = '获取数据失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {

        var idx = 0;
        for (var i = 0; i < product.plans.length; i++) {
          idx = i;
        }

        that.setData({
          currentNavtab: idx,
          product: product,
          plans: product.plans,
          planId: product.plans[0].id
        });


      }
    })
  },
  planDetial: function(pid, opt) {
    var that = this
    //var pid = that.options.productid
    //PlanDetial
    util.request(api.PlanDetial + pid + '/' + opt, {}, 'GET').then(function(res) {
      var planDetial = res.data;
      if (planDetial == null) {
        var toastText = '获取数据失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        that.setData({
          list: planDetial,
        });
      }
    })
  },
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems0: radioItems
    });
  },

  radioChange2: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems2;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems1: radioItems
    });
  },
  radioChange3: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems3: radioItems
    });
  },
  radioChange4: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems2;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems4: radioItems
    });
  },
  radioChange5: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems5: radioItems
    });
  },

  radioChange6: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems2;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems6: radioItems
    });
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
  bindDateChange: function(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  bindDateChange3: function(e) {
    this.setData({
      date3: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function(e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },


  showButton: function() {
    console.info(this.data.orderinfo)
    var datalist = this.data.orderinfo;
    datalist.insureStartTime = this.data.startDate;
    datalist.insureEndTime = this.data.endDate;
    delete datalist.createBy;
    delete datalist.createDate;
    delete datalist.updateBy;
    delete datalist.updateDate;
    console.info(this.data.orderinfo)
    wx.showLoading({
      title: '正在加载中',
    })
    var that = this;
    util.request(api.OrderSubmit, datalist, 'POST').then(function(res) {
      wx.hideLoading();
      var codes = res.data.code;
      if (codes != '200') {
        console.error('网络请求失败');
        wx.showModal({
          content: res.data.message + "请联系管理员",
          success: function(res) {
            if (res.confirm) {
              return
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }
      var premium = res.data.mdata.balance;
      // var mdataJson = res.data.data.mdata;
      var mdataJson = JSON.stringify(res.data.mdata);
      var payParam = {}
      payParam.polNo = res.data.mdata.polNo
      payParam.balance = res.data.mdata.balance
      payParam.openId = app.globalData.openId
      payParam.name = res.data.mdata.productName
      wx.showModal({
        content: '您试算保费金额为：' + premium + '，点击确认按钮投保',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/payment/index?mdata=' + JSON.stringify(payParam),
            })
           /*  wx.navigateTo({
              url: '../../order/index?mdata=' + mdataJson,
            }) */
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
    /* wx.request({
      url: app.globalData.api + app.globalData.order + "create/order",
      header: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: datalist,

      // data: Util.json2Form({ cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" }),
      complete: function(res) {
        wx.hideLoading();
        // that.setData({
        //   toastHidden: false,
        //   toastText: res.data.reason,
        //   city_name: res.data.result.data.realtime.city_name,
        //   date: res.data.result.data.realtime.date,
        //   info: res.data.result.data.realtime.weather.info,
        // });

        var codes = res.data.data.code;

        if (codes != '200') {
          console.error('网络请求失败');

          wx.showModal({
            content: res.data.data.message + "请联系管理员",
            success: function(res) {
              if (res.confirm) {
                return
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

          return;



        }

        var premium = res.data.data.mdata.balance;
        // var mdataJson = res.data.data.mdata;
        var mdataJson = JSON.stringify(res.data.data.mdata);

        wx.showModal({
          content: '您试算保费金额为：' + premium + '，点击确认按钮投保',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../order/index?mdata=' + mdataJson,
              })
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })



      }

    }); */


  },
  onClick1() {
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      options: [
        '居民身份证',
        '护照',
        '军人证',
        '港澳通行证',
        '台胞证',
        '其他',
      ],
      onConfirm: (value, index, options) => {
        console.log(value, index, options)
        this.setData({
          value1: value,
          title1: options[index],
        })
      },
    })
  },
  onClick2() {
    $wuxSelect('#wux-select2').open({
      value: this.data.value2,
      options: [{
          title: 'iPhone 3GS',
          value: '001',
        },
        {
          title: 'iPhone 5',
          value: '002',
        },
        {
          title: 'iPhone 5S',
          value: '003',
        },
        {
          title: 'iPhone 6',
          value: '004',
        },
        {
          title: 'iPhone 6S',
          value: '005',
        },
        {
          title: 'iPhone 6P',
          value: '006',
        },
        {
          title: 'iPhone 6SP',
          value: '007',
        },
        {
          title: 'iPhone SE',
          value: '008',
        },
        {
          title: 'iPhone 7',
          value: '009',
        },
      ],
      onConfirm: (value, index, options) => {
        console.log(value, index, options)
        this.setData({
          value2: value,
          title2: options[index].title,
        })
      },
    })
  },
  onClick3() {
    $wuxSelect('#wux-select3').open({
      value: this.data.value3,
      multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
      },
      options: [{
          title: '画画',
          value: '1',
        },
        {
          title: '打球',
          value: '2',
        },
        {
          title: '唱歌',
          value: '3',
        },
        {
          title: '游泳',
          value: '4',
        },
        {
          title: '健身',
          value: '5',
        },
        {
          title: '睡觉',
          value: '6',
        },
      ],
      onConfirm: (value, index, options) => {
        console.log(value, index, options)
        this.setData({
          value3: value,
          title3: index.map((n) => options[n].title),
        })
      },
    })
  },

});