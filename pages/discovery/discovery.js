// pages/discovery/discovery2.js
const app = getApp()
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var user = require('../../utils/user.js')
const icon = 'data:image/png;base64,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'
const buttons = [
  /* {
    openType: 'getUserInfo',
    label: 'GetUserInfo',
    icon,
  },  {
    openType: 'share',
    label: '分享',
    icon,
  }, */
  {
    label: '经纪人登录',
    icon,
    type: 'login'
  },
  {
    label: '理赔服务',
    icon,
    type: 'fapiao'
  },
  {
    label: '一键报案',
    icon,
  },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    username: '',
    password: '',
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
    typeIndex: 3,
    colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
    colorIndex: 3,
    dirs: ['horizontal', 'vertical', 'circle'],
    dirIndex: 1,
    spaceBetween: 10,
    buttons,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    banners: [
      app.globalData.fileUrl + 'group1/M00/00/00/CiWSS1xGky-ALG8hAAJ2UBqULCY279.jpg',
      app.globalData.fileUrl + 'group1/M00/00/00/CiWSSlxGp1mAAOY4AALinlWBIyE655.jpg',
      app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSSlw2t2SABD_RAAPE9YYwPEw824.jpg',
    ],
    swiperCurrent: 0,
    userInfo: wx.getStorageSync('userInfo'),
    imgurl: app.globalData.fileUrl,
    menu: {
      imgUrls: [
        '../../images/pro.png',
        '../../images/compar.png',
        '../../images/evaluate.png',
        '../../images/fee.png',
        '../../images/service.png',
        '../../images/xubao.png',
        '../../images/policy_tab.png',
        '../../images/fapiao.png',
      ],
      descs2: [{
          name: '产品库',
          code: '',
          url: '../product/list/list?wechatInsuranceProductType=' + ''
        },
        {
          name: '产品对比',
          code: '',
          url: '../product/choose/choose'
        },
        {
          name: '智能评测',
          code: 'tabBar',
          url: '../product/protectplan/index'
        },
        {
          name: '保费试算',
          code: '',
          url: '../product/premiumcalc/premiumcalc',
        },
        {
          name: '增值服务',
          code: '',
          url: '../my/claims/claims'
        },
        {
          name: '续保服务',
          code: '',
          url: '../policys/index',
        },

        {
          name: '保单查询',
          code: '',
          url: '../policyQuery/index',
        },
        {
          name: '发票查询',
          code: 'todo',
          url: '',
        },

        // { name: '关爱长辈', code: 'ELDER' }
      ],
      descs: [
        '健康人生',
        '快乐出行',
        '看病就医',
        '我爱我家',
        '关爱长辈',
        '保护爱车',
        '保险锦囊',
        '敬请期待',
      ]
    },
    navbar_type: [{
        name: '全部',
        code: '',
        url: '../../images/types/type.png'
      },
      {
        name: '医疗险',
        code: 'MEDICAL',
        url: '../../images/types/medical.png'
      },
      {
        name: '意外险',
        code: 'TRAVEL',
        url: '../../images/types/accident.png'
      },
      {
        name: '寿险',
        code: 'HEALTHY',
        url: '../../images/types/life.png'
      },

      {
        name: '车险',
        code: 'CAR',
        url: '../../images/types/car.png'
      },
      {
        name: '燃气险',
        code: 'FAMILYPROPERTY',
        url: '../../images/types/gas.png'
      },

    ],
    currentNavtab: 0,
    value: 4.3,
    productList: [],
    insuranceCompanyList: [],
    msg: {
      icon: '../../images/kong.png',
      title: '空空如也',
      text: '暂时没有相关数据',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var url = api.ProductList
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
          productList: list,
          insuranceCompanyList: insuranceCompanyList
        });
      }

    })
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 0 && e.detail.value.type == 'login') {
      if (!app.globalData.hasLogin) {
        wx.navigateTo({
          url: "/pages/authorize/authorize"
        })
        return;
      }
      if (wx.getStorageSync('userInfo')) {
        this.setData({
          userInfo: wx.getStorageSync('userInfo'),
          hasUserInfo: true
        })
      } 
      if (wx.getStorageSync('enn_openid')) {
        app.globalData.openId = wx.getStorageSync('enn_openid');
      } else {
        user.loginByWeixin(true).then(res => {
          app.globalData.hasLogin = true;
          app.globalData.openId = res.openId;
          console.log(wx.getStorageSync('enn_openid'))
        })
      }
      this.setData({
        show: true
      });
    }
    if (e.detail.index === 0 && e.detail.value.type=='loginout'){
      wx.showModal({
        title: '',
        confirmColor: '#b4282d',
        content: '退出登录？',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync('username');
            wx.removeStorageSync('password');
            wx.setStorageSync('advisorId', '000')
            wx.setStorageSync('isAdvisor', '1')
            var username = wx.getStorageSync('username')
            var password = wx.getStorageSync('password')
            //AdvisorLoginOut
            var url = api.AdvisorLoginOut + app.globalData.openId
            util.request(url, {}, 'GET').then(function (res) {
              console.log('退出登录')
            })

          }
        }
      })
    }
    if (e.detail.index === 1) {
      console.log("理赔服务")
      wx.showModal({
        title: '',
        content: '暂未开放',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          } else if (res.cancel) {
            return;
            console.log('用户点击取消')
          }
        }
      })
      return;
     /*  wx.navigateTo({
        url: '/pages/policyQuery/index',
      }) */
    }
    if (e.detail.index === 2) {
      wx.makePhoneCall({
        phoneNumber: "4006058000",
        success: function() {
          console.log("拨打电话成功！")
        },
        fail: function() {
          console.log("拨打电话失败！")
        }

      })
    }
  },
  onContact(e) {
    console.log('onContact', e)
  },
  onGotUserInfo(e) {
    console.log('onGotUserInfo', e)
  },
  onChange(e) {
    console.log('onChange', e)
  },
  onChange1(event) {
    this.setData({
      username: event.detail
    })
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      password: event.detail
    })
  },
  confirmM: function() {
    console.log("姓名：" + this.data.username + "  电话：" + this.data.password);
    console.log("openId：" + app.globalData.openId); //wx.getStorageSync('openId'));
    //AdvisorLogin
    var phone = this.data.username
    var passWord = this.data.password
    app.globalData.openId = wx.getStorageSync('enn_openid')
    var that = this
    util.request(api.AdvisorLogin, {
      userName: this.data.username,
      password: this.data.password,
      openId: app.globalData.openId
    }, 'POST').then(function(res) {
      if (res.data.code == "200") {
        console.log(res.data.advisorId);
        app.globalData.advisorId = res.data.advisorId
        app.globalData.isAdvisor = '0'
        wx.setStorageSync('advisorId', res.data.advisorId)
        wx.setStorageSync('isAdvisor', '0')
        if (phone != '' && passWord != '') {
          //调用API向本地缓存存入数据
          var username = wx.getStorageSync('username') || ''
          username = phone
          wx.setStorageSync('username', username)
          var password = wx.getStorageSync('password') || ''
          password = passWord
          wx.setStorageSync('password', password)
        }
        // wx.setStorageSync('advisorId', res.data.data.advisorId)
        wx.showToast({
          title: 'success',
        })
        const buttons = [
          /* {
            openType: 'getUserInfo',
            label: 'GetUserInfo',
            icon,
          },  {
            openType: 'share',
            label: '分享',
            icon,
          }, */
          {
            label: '退出登录',
            icon,
            type: 'loginout'
          },
          {
            label: '理赔服务',
            icon,
            type: 'fapiao'
          },
          {
            label: '一键报案',
            icon,
          },
        ]
        that.setData({
          showhidden: false,
          buttons: buttons
        })
        wx.navigateBack(1);
      } else {
        wx.showModal({
          content: res.data.msg + "请重新登录",
          showCancel: false,
          show: true,
          success: function success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
        return;
      }
    })
  },
  onClose(event) {
    if (event.detail === 'confirm') {
      this.confirmM()
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
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
    var userInfo = wx.getStorageSync('userInfo')
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    this.setData({
      username: username,
      password: password,
      userInfo: userInfo
    })
    if (username != '' && password != '') {
      const buttons = [
        /* {
          openType: 'getUserInfo',
          label: 'GetUserInfo',
          icon,
        },  {
          openType: 'share',
          label: '分享',
          icon,
        }, */
        {
          label: '退出登录',
          icon,
          type:'loginout'
        },
        {
          label: '理赔服务',
          icon,
          type: 'fapiao'
        },
        {
          label: '一键报案',
          icon,
        },
      ]
      this.setData({
        buttons: buttons
      })
    } else {
      
    }
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
  bindItemTap(e) {
    var code = e.currentTarget.dataset.code
    var url = e.currentTarget.dataset.url
    var index = e.currentTarget.dataset.index
    if (code == 'tabBar') {
      wx.switchTab({
        url: url
      })
      return;
    }
    if (code == 'todo') {
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
    wx.navigateTo({
      url: url
    })
    /*wx.switchTab({
      url: url
    })*/
  },
  //事件处理函数
  swiperchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  gitTypeList: function(res) {
    var code = res.currentTarget.dataset.code
    var idx = res.currentTarget.dataset.idx
    var that = this
    var url = ''
    if (code == "") {
      url = api.ProductList
    } else {
      url = api.ProductCategory + '?wechatInsuranceProductType=' + code
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
        that.setData({
          productList: list,
          currentNavtab: idx,
        });
      }
    })
  },
  viewTrip: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../product/detial/detial?id=' + ds.id
    })
  },
})