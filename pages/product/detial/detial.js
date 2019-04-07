// pages/insure/index.js
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var moment = require('../../../utils/moment.js')
const app = getApp()
Page({
  data: {
    trialshow: false,
    careers: ["1-3类", "4-6类"],
    careers2: ["一类", "二类", "三类", "四类", "五类", "六类"],

    //careersValue: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH'],
    careersValue: ['FIRST', 'SIXTH'],
    suitIds: ['1111', '1112', '1113', '1114', '1115', '1116'],
    careerIndex: 0,
    planCode: '',
    planName: '',
    suiteId: '',
    coverageTerms: [],
    coverageTermsIndex: 0,
    imgurl: app.globalData.fileUrl,
    //  产品code  id 及 保险公司code
    productCode: "",
    productids: "",
    product: null,
    showTopTips: false,
    currentNavtab: '0',
    startDate: '',
    endDate: '',
    balance: null,
    totalAmount: null,
    hidden: true,
    modalHidden: true,
    collected: false,
    show: false,
    id: null
  },
  onLoad: function(options) {
    var productCollectedId = options.id
    var that = this;
    var productsCollected = wx.getStorageSync('productscollected')
    //调用应用实例的方法获取全局数据
    this.productDetial(options.id);
    //汉字
    if (productsCollected) {    //读取其中一个缓存状态
      var productCollected = productsCollected[productCollectedId]
      if (typeof productCollected != 'undefined') {
        that.setData({     //将是否被收藏的状态上绑定到collected这个变量上
          collected: productCollected
        }) 
      } 
    } else {
      var productsCollected = {};
      productsCollected[productCollectedId] = false;
      wx.setStorageSync("productscollected", productsCollected)  
    }
    wx.reportAnalytics('product_view', {
      product_name: 0,
    });
  },

  productDetial: function(options) {
    var that = this
    var url = api.ProductDetail + options
    util.request(url, {}, 'GET').then(function(res) {
      var product = res.data;
      if (product == undefined) {
        var toastText = '获取数据失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {

        for (var i = 0; i < product.importantInfo.length; i++) {
          product.importantInfo[i].name = product.importantInfo[i].name.split(".")[0]
        }
        for (var i = 0; i < product.provision.length; i++) {
          product.provision[i].name = product.provision[i].name.split(".")[0]
        }
        that.setData({
          productids: product.id,
          insureComCode: product.insuranceCompany.companyCode,
          productCode: product.code,
          product: product,
          plans: product.plans,
          planId: product.plans[0].id,
          plancode: product.plans[0].code,
          planName: product.plans[0].name,
          suiteId: product.plans[0].id
        });
        that.planDetial(that.data.planId)
      }
    })
  },
  planDetial: function(options) {
    var that = this
    var pid = this.options.id
    var url = api.PlanDetial + pid + '/' + options
    util.request(url, {}, 'GET').then(function(res) {
      var planDetial = res.data;
      if (planDetial == null) {
        var toastText = '获取数据失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        var reg = '^[\u4e00-\u9fa5]{0,}$'
        for (var i = 0; i < planDetial.length; i++) {
          if (!planDetial[i].amount.match(reg)) {
            planDetial[i].amount = planDetial[i].amount + '元'
          } else {
            planDetial[i].amount = planDetial[i].amount
          }
        }
        that.setData({
          list: planDetial,

        });


      }
    })

  },
  liabilityAmount: function(e) {
    var that = this
    console.log(e)
    var pid = this.options.id
    var id = e.currentTarget.dataset.id
    var idx = e.currentTarget.dataset.idx
    var plancode = e.currentTarget.dataset.plancode
    var planName = e.currentTarget.dataset.planname
    var url = api.PlanDetial + pid + '/' + id
    util.request(url, {}, 'GET').then(function(res) {
      var planDetial = res.data;
      if (planDetial == null) {
        var toastText = '获取数据失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      } else {
        var reg = '^[\u4e00-\u9fa5]{0,}$'
        for (var i = 0; i < planDetial.length; i++) {
          if (!planDetial[i].amount.match(reg)) {
            planDetial[i].amount = planDetial[i].amount + '元'
          } else {
            planDetial[i].amount = planDetial[i].amount
          }

        }
        that.setData({
          list: planDetial,
          currentNavtab: idx,
          planId: id,
          plancode: plancode,
          planName: planName,
          suiteId: id,
          //modalHidden: false
        });
      }

    })
  },
  /**
   * 点击取消
   */
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function() {
    // do something
    
    this.setData({
      modalHidden: true
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
  onCollectionTap: function(event) {
    var that = this
    // 从缓存中读取所有的缓存状态
    var productsCollected = wx.getStorageSync('productscollected')
    var productCollectedId = event.currentTarget.dataset.id
    var collected = productsCollected[productCollectedId]
    collected = !collected
    productsCollected[productCollectedId] = collected
    wx.setStorageSync("productscollected", productsCollected)  
    that.setData({
      collected: collected
    });
    console.log('onCancel', event)
  },
  toggleBottomPopup: function(event) {
    var plan = event.currentTarget.dataset.plan
    var index = event.currentTarget.dataset.idx
    if (plan[index].amount == '不支持') {
      plan[index].show = false
    } else {
      plan[index].show = true
    }

    this.setData({
      list: plan,
      show: true
    });
  },
  openInfo(event) {
    var info = event.currentTarget.dataset.info
    var url = info
    wx.downloadFile({
      url: url,
      success: function(res) {
        var filePath = res.tempFilePath
        console.log('下载文档成功')
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            console.log('打开文档成功')
          },
          fail: function(res) {
            console.log(res)
          }
        })
      },
      fail: function() {
        console.log('下载文档失败' + url)
      }

    })
  },
  onClose(event) {
    var plan = event.currentTarget.dataset.plan
    var index = event.currentTarget.dataset.idx
    plan[index].show = false
    this.setData({
      list: plan,
      show: true,

    });
  },
  toProvision: function(event) {
    var provisions = event.currentTarget.dataset.info;
    // JSON.stringify(provisions)
    wx.navigateTo({
      url: '../provision/provision?provisionList=' + JSON.stringify(provisions)
    })
  },
  immeBuy: function(e) {
    this.trialTAp()
  },
  bindCareerChange: function(e) {
    console.log('picker  发生选择改变，携带值为', e.detail.value);
    this.setData({
      careerIndex: e.detail.value
    })
  },
  bindCoverageChange: function(e) {
    console.log('picker  发生选择改变，携带值为', e.detail.value);
    this.setData({
      coverageTermsIndex: e.detail.value
    })
  },
  trialTAp: function() {
    //this.getUserInfo()
    if (!app.globalData.hasLogin){
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
return;
    }
    if (this.data.product.code == 'CP0031601' || this.data.product.code == 'CG0021601') {
      const data = {}
      data.name = this.data.product.name
      data.id = this.data.product.id
      data.binaryCode = this.data.product.binaryCode
      data.code = this.data.product.code
      data.planId = this.data.planId
      data.planName = this.data.planName
      data.plancode = this.data.plancode
      data.insureComCode = this.data.product.insuranceCompany.companyCode
      data.age = this.data.product.productRule.minInsuredAge + "-" + this.data.product.productRule.maxInsuredAge
      data.minInsuredCount = this.data.product.productRule.minInsuredCount
      data.maxInsuredCount = this.data.product.productRule.maxInsuredCount
      data.balance = 0
      data.totalAmount = 0
      data.isCollecting = this.data.product.isCollecting
      data.effectDays = this.data.product.effectDays
      const options = JSON.stringify(data)
      console.log(options)
      wx.navigateTo({
        url: '../../insure/insure?mdata=' + options
      })
      /* wx.navigateTo({
         url: '../../insure/index'
       })*/
    } else {
      var coverageTerms = this.data.product.coverageTerms
      this.data.coverageTerms = []
      for (var i = 0; i < coverageTerms.length; i++) {
        this.data.coverageTerms.push(coverageTerms[i].label)
      }
      this.setData({
        coverageTerms: this.data.coverageTerms,
        trialshow: true
      })
    }

  },
  onCloseTrial() {
    this.setData({
      trialshow: false,
      totalAmount: 0

    })
  },
  bindCareerTap: function() {
    wx.navigateTo({
      url: '/pages/career/career'
    })
  },
  formSubmit: function(e) {
    var that = this
    
    var data = {}
    console.log(that.data.careersValue[e.detail.value.career])
    data.insuranceProductId = e.detail.value.insuranceProductId
    data.planId = e.detail.value.planId
    data.jobTypes = that.data.careersValue[e.detail.value.career]
    data.coverageTermCode = that.data.product.coverageTerms[e.detail.value.coverageTerm].code
    //this.data.product.coverageTerms[e.detail.value.coverageTerm].code
    data.amount = 0
    data.id = ''
    data.balance = 0
    data.premiumType = ''
    console.log(data)
    const jobTypes = that.data.careersValue
    const plans = that.data.plans
    var mdata = {}
    if (jobTypes[e.detail.value.career] == that.data.careersValue[0] && e.detail.value.planId == plans[0].id) {
      mdata.plancode = '1111'

    }
    if (jobTypes[e.detail.value.career] == that.data.careersValue[1] && e.detail.value.planId == plans[0].id) {
      mdata.plancode = '1112'

    }
    if (jobTypes[e.detail.value.career] == that.data.careersValue[0] && e.detail.value.planId == plans[1].id) {
      mdata.plancode = '1113'

    }
    if (jobTypes[e.detail.value.career] == that.data.careersValue[1] && e.detail.value.planId == plans[1].id) {
      mdata.plancode = '1114'

    }
    if (jobTypes[e.detail.value.career] == that.data.careersValue[0] && e.detail.value.planId == plans[2].id) {
      mdata.plancode = '1115'

    }
    if (jobTypes[e.detail.value.career] == that.data.careersValue[1] && e.detail.value.planId == plans[2].id) {
      mdata.plancode = '1116'

    }
    mdata.binaryCode = that.data.product.binaryCode
    mdata.name = that.data.product.name
    mdata.id = that.data.product.id
    mdata.code = that.data.product.code
    mdata.age = that.data.product.productRule.minInsuredAge + "-" + that.data.product.productRule.maxInsuredAge
    mdata.planName = that.data.planName
    mdata.planId = that.data.plancode
    mdata.insureComCode = that.data.product.insuranceCompany.companyCode
    mdata.effectDays = that.data.product.effectDays
    mdata.minInsuredCount = that.data.product.productRule.minInsuredCount
    mdata.maxInsuredCount = that.data.product.productRule.maxInsuredCount
    mdata.isCollecting = that.data.product.isCollecting
    that.getAmounts()
    util.request(api.ProductAmount, data, 'POST').then(function(res) {
      console.log(mdata)
      mdata.balance = res.data.premium
      mdata.totalAmount = that.data.totalAmount
      console.log("mdata" + mdata)
      var dataJson = JSON.stringify(mdata)
      console.log("mdata" + dataJson)
      wx.showModal({
        content: '您试算的单人保费金额为：' + res.data.premium + '，点击确认按钮投保',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../insure/insure?mdata=' + dataJson,
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  },
  //计算保额
  getAmounts: function() {
    var that = this
    const pid = that.data.product.id
    const planId = that.data.planId
    var totalAmount = 0
    var planDetial = that.data.list;
    var reg = '^[\u4e00-\u9fa5]{0,}$'
    for (var i = 0; i < planDetial.length; i++) {
      if (!planDetial[i].amount.match(reg)) {
        totalAmount += parseInt(planDetial[i].amount)
      } else {

      }

    }
    that.setData({
      totalAmount: totalAmount
    })
  },
  call: function(event) {
    var telephone = event.currentTarget.dataset.telephone
    wx.makePhoneCall({
      phoneNumber: telephone,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.product.name,
      desc: this.data.product.name,
      path: '/pages/product/detial/detial?id=' + this.data.product.id
    }
  },
  // 获取用户信息
  getUserInfo() {
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          if (!wx.getStorageSync('enn_openid')) {
            that.getOpenid()
          } else {
            app.globalData.openId = wx.getStorageSync('enn_openid')
          }
        } else {
          wx.navigateTo({
            url: "/pages/authorize/authorize"
          })
        }
      }
    })
  },
  getOpenid: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var url = api.LoginByWeixin + '?code=' + res.code
        util.request(url, {}, 'GET').then(function(res) {
            if (res.status == "") {
              app.globalData.openId = res.openId;
              wx.setStorageSync('enn_openid', res.openId)
              console.log(wx.getStorageSync('enn_openid'))
            } else {
              that.getOpenid();
            }

          }

        )
      }
    })
  },

});