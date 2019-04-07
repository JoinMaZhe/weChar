// pages/insure/index.js
var util = require('../../utils/util.js')
var user = require('../../utils/user.js')
var api = require('../../utils/api.js')
var moment = require('../../utils/moment.js')
var work = require('../../utils/work.js')
const app = getApp()
Page({
  data: {
    validDates: ['长期有效', '选择日期'],
    validDateType: '长期有效',
    validDate: '9999-12-31',
    validDateShow: 'true',
    currentNavtabs: ['0'],
    date_benefits: ["1999-01-01"],
    date_benefit: "1999-01-01",
    pickerRangeBenifits: ['第一顺位'],
    pickerRangeBenifitsValue: [1],
    pickerRangeBenifit: ['第一顺位', '第二顺位', '第三顺位', '第四顺位', '第五顺位'],
    pickerRangeBenifitvalue: [1, 2, 3, 4, 5],
    pickerRangeBenifitIndex: 0,
    pickerRangeBenifitRate: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40', '100%'],
    pickerRangeBenifitRates: ['100%'],
    pickerRangeBenifitRateIndex: 5,
    identifyTypes: [{
      name: '居民身份证',
      value: '120001'
    }, ],
    currentNavtab: "0",
    benefit_type: '01',
    benefit_relation: '01',
    taxPayerReceipt: '0',
    taxPayerReceipts: ['0', '1'],
    relations: [{
      name: '父母',
      value: '02'
    }],
    benefit_relations: [{
      name: '父母',
      value: '02'
    }, {
      name: '配偶',
      value: '01'
    }, {
      name: '子女',
      value: '03'
    }],
    benefit_mount: ['新增', ],
    benefit_mountIndex: 0,
    ownerKeys: [],
    insuredKeys: [],
    ownerRule: '',
    insureRule: '',
    rule: {
      "id": "5c6d003d08ccfa00080066e2",
      "binaryCode": "HYXH001",
      "shortName": "汇友综合意外保险",
      "name": "汇友综合意外保险",
      "isExsist": true,
      "ownerCount": 5,
      "ownerKeys": ["applyName", "applyCardType", "applyCard", "applyeTel", "applyEmail",'idValidDate'],
      "isForOwner": true,
      "insuredCount": 3,
      "insuredKeys": ["applyRelationtype", "insureName", "insureCardType"],
      "propertyCount": 1,
      "propertyKeys": ["housingAge"]
    },
    isCollecting: false,
    advisorId: '',
    imgurl: app.globalData.fileUrl,
    applyname: '',
    applycardnum: '',
    applyphone: '',
    applymailnum: '',
    planCode: '',
    planName: '',
    suiteId: '',
    //产品code  id 及 保险公司code
    productCode: "",
    productId: "",
    insureComCode: "",
    product: null,
    createOrder: {},
    applyVM: {},
    saleVM: {},
    insuredVMS: [],
    checkbox: [1],
    showTopTips: false,
    currentNavtab: '0',
    sexradioItems: [
      [{
          name: '男',
          value: 'M'
        },
        {
          name: '女',
          value: 'F',
          checked: true
        }
      ]
    ],
    radioItems: [{
        name: '男',
        value: 'M'
      },
      {
        name: '女',
        value: 'F',
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
    pickers: [{
        name: '本人',
        value: '601005'
      }, {
        name: '配偶',
        value: '006'
      }, {
        name: '子女',
        value: '007'
      },
      {
        name: '父母 ',
        value: '008'
      }, {
        name: '其他 ',
        value: '099'
      }
    ],
    certsApply: [{
        name: '居民身份证',
        value: '120001'
      }, {
        name: '护照',
        value: '120002'
      }, {
        name: '军人证',
        value: '120003'
      },
      {
        name: '港澳通行证',
        value: '120005'
      }, {
        name: '台胞证',
        value: '120006'
      }, {
        name: '其它',
        value: '120009'
      }
    ],
    certs: [{
        name: '居民身份证',
        value: '120001'
      }, {
        name: '护照',
        value: '120002'
      }, {
        name: '军人证',
        value: '120003'
      },
      {
        name: '港澳通行证',
        value: '120005'
      }, {
        name: '台胞证',
        value: '120006'
      }, {
        name: '其它',
        value: '120009'
      }
    ],
    dates: ['1998-01-01'],
    picker1Value: 0,
    picker1Range: ['本人', '配偶', '子女', '父母 ', '其他'],
    picker2Value: 0,
    picker2Range: ['居民身份证', '护照', '军人证', '港澳通行证', '台胞证', '其它'],
    picker3Range: ['居民身份证'],
    picker3RangeValue: '120001',
    radioItems0: [],
    radioItems1: [],


    date: ["1999-01-01"],
    date1: '',
    date2: '',
    date3: '',

    value1: '',
    title1: '',
    value2: '',
    title2: '',
    value3: '',
    title3: '',
    startDate: '',
    endDate: '',
    balance: null,
    hidden: true,
    modalHidden: true,
    addinsure: false,
    addButton: false,
    isAgree: false,
    resetButton: true,
    index: 0,
    region: ['北京市', '北京市', '东城区'],
    regioncode: ["110000", "110100", "110101"],
    worktype: [],
    workcode: [],
    worktypefilter: [],
    workcodefilter: [],
    postCode: '',
    worktypeindex: 0,
    urllist: [{
      name: '《保险经纪服务委托协议书》',
      url: app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSS1w2uMCAUCWFAAER-a_Ks2s457.pdf'
    }, {
      name: '《投保声明书》',
      url: app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSS1w2uOSAfKjaAAD8RIlG7zk868.pdf'
    }, {
      name: '《投保人税收居民身份声明书》',
      url: app.globalData.fileUrl + 'group1/M00/00/00/CiWSSlyLTA-AMd6gAADG9xq9c5U422.pdf'
    }, {
      name: '《新奥保险经纪有限公司客户告知书》',
      url: app.globalData.fileUrl + 'group1%2FM00%2F00%2F00%2FCiWSS1w2uI-AHmJ2AABcLgRY7pg04.docx'
    }, ],

  },

  onLoad: function(options) {
    var mdata = JSON.parse(options.mdata)
    console.log(options.mdata, mdata)
    var that = this;
    var date = new Date();
    var start = moment(util.formatTime(date)).add(mdata.effectDays, 'days').locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
    console.log(start);
    var end = moment(util.formatTime(date)).add(mdata.effectDays, 'days').add(1, 'years').format('YYYY-MM-DD HH:mm:ss')
    console.log(moment(util.formatTime(date)).add(1, 'years').format('YYYY-MM-DD HH:mm:ss'));
    console.log(util.formatTime(date));
    that.setData({
      ownerKeys: work.ownerKeys,
      insuredKeys: work.insuredKeys,
      worktype: Object.values(work.worktype),
      worktypefilter: Object.values(work.worktype),
      workcode: Object.keys(work.worktype),
      startDate: start,
      endDate: end,
      product: mdata,
      productCode: mdata.code,
      insureComCode: mdata.insureComCode,
      productId: mdata.id,
      suiteId: mdata.planId,
      planCode: mdata.plancode,
      isCollecting: mdata.isCollecting,

    })
    var ownerKeys = that.data.ownerKeys;
    var insuredKeys = that.data.insuredKeys;
    //var rule = that.data.rule;
    var rule = {}
    util.request(api.ProductUnderWriting + mdata.binaryCode, {}, 'GET').then(function(res) {

      rule = res.data
      var ownerRuleObj = {
        "applyName": '',
        "applyCardType": '',
        "applyCard": '',
        "applyeTel": '',
        "applyEmail": '',
        "address": '',
        "idValidDate":''
      }
      var insureRuleObj = {
        "applyRelationtype": '',
        "insureName": '',
        "insureCardType": '',
        "insureCard": '',
        "insureTel": '',
        "insureBirthday": '',
        "location": '',
        "occupation": '',
        "insureSex": '',
        "socialFlag": '',
        "jobUnitName": ''
      }
      for (var i = 0; i < rule.ownerKeys.length; i++) {
        if (ownerKeys.includes(rule.ownerKeys[i])) {
          var item = rule.ownerKeys[i]
          ownerRuleObj[item] = rule.ownerKeys[i]
        }
      }
      for (var i = 0; i < rule.insuredKeys.length; i++) {
        if (insuredKeys.includes(rule.insuredKeys[i])) {
          var item = rule.insuredKeys[i]
          insureRuleObj[item] = rule.insuredKeys[i]
        }
      }
      var checkbox = []
      var dates = []
      for (var i = 0; i < mdata.minInsuredCount; i++) {
        checkbox.push(1)
        dates.push('1998-01-01')
      }
      if (rule.isForOwner) {
        that.data.picker1Range = ['本人']
      }
      that.setData({
        ownerRule: ownerRuleObj,
        insureRule: insureRuleObj,
        checkbox: checkbox,
        picker1Range: that.data.picker1Range,
        dates: dates

      })
      console.log(ownerRuleObj)
      console.log(insureRuleObj)
    })
    if (wx.getStorageSync('enn_openid')) {
      app.globalData.openId = wx.getStorageSync('enn_openid');
    } else {
      user.loginByWeixin(true).then(res => {
        app.globalData.hasLogin = true;
        app.globalData.openId = res.openId;
        console.log(wx.getStorageSync('enn_openid'))
      })
    }
    util.request(api.UserIndex + app.globalData.openId, {}, 'GET').then(function(res) {

      //typeof (loginFlag) != "undefined"
      var entity = res.data;
      if (entity == null) {
        that.setData({
          applyVM: {},
        });
      } else if (entity.isAdvisor == null) {
        that.setData({
          applyVM: entity,
        });
      } else {
        that.setData({
          applyVM: {},
        });
      }
    })
     that.getuserLocation()
  },
  getuserLocation() {
    var that = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation()

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          that.getLocation()
        } else {
          //调用wx.getLocation的API
          that.getLocation()
        }
      }
    })
  },

  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo',
          data: {
            key: 'db704588022b9c334674dd8dcba1a417',
            location: res.longitude + "," + res.latitude,
            extensions: "all",
            s: "rsx",
            sdkversion: "sdkversion",
            logversion: "logversion"

          },
          success: function(res) {
            that.setData({
              textData: {
                name: res.data.regeocode.pois[0].name,
                desc: res.data.regeocode.formatted_address
              }
            })
            console.log(JSON.stringify(res.data.regeocode.formatted_address));
          },
          fail: function(res) {

          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShow: function() {
    var that = this;
    var advisorId = app.globalData.advisorId
    console.log(app.globalData.advisorId)
    //includes
    if (advisorId == '000') {
      util.request(api.UserIndex + app.globalData.openId, {}, 'GET').then(function(res) {
        var entity = res.data;
        if (entity == null) {
          var toastText = '获取数据失败'
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            advisorId: entity.advisorId,
          });
          console.log(entity.advisorId)
        }
      })
    } else {
      that.setData({
        advisorId: advisorId
      })
    }
  },
  bindPickerChange: function(e) {
    var index = e.currentTarget.dataset.idx;
    // this.data.pickers[index] = e.detail.value;
    var xdata = e.detail.value;
    //if (this.data.productCode == 'CP0031601') {

    if (xdata == 0) {
      this.data.pickers[index].name = "本人";
      this.data.pickers[index].value = "601005";
    };
    if (xdata == 1) {
      this.data.pickers[index].name = "配偶";
      this.data.pickers[index].value = "006";
    };
    if (xdata == 2) {
      this.data.pickers[index].name = "子女";
      this.data.pickers[index].value = "007";
    };
    if (xdata == 3) {

      this.data.pickers[index].name = "父母";
      this.data.pickers[index].value = "008";
    };
    if (xdata == 4) {
      this.data.pickers[index].name = "其他";
      this.data.pickers[index].value = "099";
    };

    // } else {
    this.setData({
      pickers: this.data.pickers,
      picker1Value: e.detail.value
    })
  },

  downloadFile: function(e) {
    var url = e.currentTarget.dataset.url
    console.log(url)
    wx.downloadFile({
      url: url,
      success: function(res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  bindCheckbox: function(e) {
    this.setData({
      isAgree: !this.data.isAgree,
    })
  },

  bindPickerChange2: function(e) {

    var index = e.currentTarget.dataset.idx;
    // this.data.pickers[index] = e.detail.value;
    var xdata = e.detail.value;
    // '身份证', '护照', '军人证', '其他'
    if (xdata == 0) {
      this.data.certs[index].name = "居民身份证";
      this.data.certs[index].value = "120001";
    };

    if (xdata == 1) {
      this.data.certs[index].name = "护照";
      this.data.certs[index].value = "120002";


    };
    if (xdata == 2) {
      this.data.certs[index].name = "军人证";
      this.data.certs[index].value = "120003";

    };
    if (xdata == 3) {
      this.data.certs[index].name = "港澳通行证";
      this.data.certs[index].value = "120005";

    };
    if (xdata == 4) {
      this.data.certs[index].name = "台胞证";
      this.data.certs[index].value = "120006";

    };
    if (xdata == 5) {
      this.data.certs[index].name = "其它";
      this.data.certs[index].value = "120009";

    };
    this.setData({
      certs: this.data.certs,
      picker2Value: e.detail.value
    })
  },
  bindPickerChange3: function(e) {
    // this.data.pickers[index] = e.detail.value;
    this.setData({
      index: e.detail.value,
      picker3Range: [this.data.picker2Range[e.detail.value]],
      picker3RangeValue: this.data.certs[e.detail.value].value
    })

  },
  addInsure: function() {
    this.setData({
      hidden: false
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
  radioChange: function(event) {
    console.log('radio发生change事件，携带value值为：', event.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {

      radioItems[i].checked = radioItems[i].value == event.detail.value;
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
    var index = e.currentTarget.dataset.idx;
    this.data.dates[index] = e.detail.value;
    this.setData({
      dates: this.data.dates,
      //date: [e.detail.value],
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  //添加被保人
  insert: function(e) {
    var cb = this.data.checkbox;
    cb.push(1);
    this.data.dates.push("1998-02-02")
    this.data.sexradioItems.push(this.data.radioItems)
    if (cb.length == this.data.product.maxInsuredCount) {
      this.setData({
        certs: this.data.certs,
        checkbox: cb,
        dates: this.data.dates,
        sexradioItems: this.data.sexradioItems,
        addButton: true,
        resetButton: false
      });
    } else {
      this.setData({
        certs: this.data.certs,
        checkbox: cb,
        dates: this.data.dates,
        sexradioItems: this.data.sexradioItems,
        addButton: false,
        resetButton: false
      });
    }
  },
  reset: function(e) {
    var cb = this.data.checkbox;
    cb.pop();
    if (cb.length == this.data.product.minInsuredCount) {
      this.setData({
        checkbox: cb,
        addinsure: false,
        addButton: false,
        resetButton: true
      });
    }
    this.setData({
      checkbox: cb,
      addButton: false,
      addinsure: false
    });
  },

  // 提交form表单
  formSubmit: function(e) {
    if (this.data.isAgree) {

      //var that = this;
      var formData = e.detail.value;
      //openid
      this.data.createOrder.openId = app.globalData.openId;
      //经纪人id
      this.data.createOrder.salePersonId = this.data.advisorId;
      this.data.createOrder.orderStatus = "";
      this.data.createOrder.orderPayStatus = "";
      this.data.createOrder.organizeCode = "";
      this.data.createOrder.origPolicyNo = "";
      this.data.createOrder.propoSalno = "";
      this.data.createOrder.polNo = "";
      this.data.createOrder.id = 1;
      this.data.createOrder.type = 1;
      this.data.createOrder.balance = this.data.product.balance;
      this.data.createOrder.totalAmount = this.data.product.totalAmount;
      this.data.createOrder.insCpyCode = this.data.insureComCode;
      this.data.createOrder.insureStartTime = formData.insureStarTtime;
      this.data.createOrder.insureEndTime = formData.insureEndTime;
      this.data.createOrder.houseAddress = "";
      this.data.createOrder.gazCode = "";
      this.data.createOrder.produceId = this.data.productId;
      this.data.createOrder.suiteCode = this.data.planCode;
      this.data.createOrder.suiteId = this.data.suiteId;
      this.data.createOrder.productName = formData.productName;
      this.data.createOrder.orderDetailId = "";
      this.data.createOrder.applyPersonId = "";
      this.data.createOrder.insurePersonId = "";
      this.data.applyVM.applyName = formData.applyName;
      this.data.applyVM.applyCardType = this.data.certsApply[formData.applyCardType].value;
      if (formData.applyCard == "") {
        wx.showModal({
          content: '投保人证件号信息必填',
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
        return
      } else {
        this.data.applyVM.applyCard = formData.applyCard;
      }
      if (formData.applyeTel.length == 0) {

        wx.showToast({

          title: '手机号码不得为空!',

          icon: 'none',

          duration: 1500

        })

        setTimeout(function() {

          wx.hideToast()

        }, 2000)
        return;

      } else if (formData.applyeTel.length != 11) {

        wx.showToast({
          title: '请输入11位手机号码!',
          icon: 'none',
          duration: 1500
        })
        setTimeout(function() {
          wx.hideToast()
        }, 2000)
        return;

      } else {
        this.data.applyVM.applyTel = formData.applyeTel;
      }

      this.data.applyVM.applyEmail = formData.applyEmail;
      this.data.applyVM.applySex = util.getSex(formData.applyCard);
      this.data.applyVM.applyBirthday = util.getBirthday(formData.applyCard);
      this.data.applyVM.applyAdress = formData.address;
      this.data.applyVM.taxPayerAddress = formData.address;
      this.data.applyVM.idValidDate = formData.idValidDate;
      this.data.createOrder.applyVM = this.data.applyVM;

      this.data.saleVM.saleName = "";
      this.data.saleVM.saleCardType = "";
      this.data.saleVM.saleCard = "";
      this.data.saleVM.saleTel = "";
      this.data.saleVM.saleAdress = "";
      this.data.saleVM.saleEmail = "";
      this.data.createOrder.saleVM = this.data.saleVM;

      /* this.data.createOrder.saleName = "小米";
       this.data.createOrder.saleCardType = "1";
       this.data.createOrder.saleCard = "";
       this.data.createOrder.saleTel = "15516179588";
       this.data.createOrder.saleEmail = "";
       this.data.createOrder.saleAdress = "";*/
      this.data.createOrder.recDate = "2018-09-18";

      this.data.insuredVMS = [];
      // insuredVMS
      for (var i = 1; i <= this.data.checkbox.length; i++) {
        var insued = {};
        if (i == 1) {}
        //  var das =  "insureName1"
        insued.insureName = formData["insureName" + i];
        insued.insureCardType = formData["insureCardType" + i];
        insued.insureCard = formData["insureCard" + i];
        insued.insureSex = formData["insureSex" + i];;
        insued.insureBirthday = formData["insureBirthday" + i];
        insued.socialFlag = formData["socialFlag" + i];
        insued.applyRelation = formData["type" + i];
        insued.insureTel = formData["insureTel" + i];
        insued.insureEmail = "";
        insued.insureAdress = "";
        insued.provinceCode = this.data.regioncode[0]
        insued.cityCode = this.data.regioncode[1]
        insued.countyCode = this.data.regioncode[2]
        insued.occupation = formData["occupation" + i];
        insued.jobUnitName = formData["jobUnitName" + i];
        insued.postCode = this.data.postCode
        this.data.insuredVMS.push(insued);
      }

      this.data.createOrder.insuredVMS = this.data.insuredVMS;
      //受益人orderNo 受益顺序 
      /* name 指定受益人姓名
      BenefitPhone 受益人联系电话
      sex 性别
      birthDay 出生日期
      identifyType 证件类型
      identifyNumber 证件号
      benifitPercent 受益份额
      relation 与被保险人关 */
      if (this.data.benefit_type === '02') {
        var benefitedVMS = []
        for (var i = 1; i <= this.data.benefit_mount.length; i++) {
          var benefit = {};
          benefit.insuredRelation = formData["relation" + i];
          benefit.benefitedName = formData["name" + i];
          benefit.benefitedCardType = formData["identifyType" + i];
          benefit.benefitedCard = formData["identifyNumber" + i];
          benefit.benefitedTel = formData["benefitPhone" + i];
          benefit.benefitedSex = formData["sex" + i];
          benefit.benefitedBirthday = formData["birthDay" + i];
          benefit.orderSequence = formData["orderNo" + i];
          benefit.benifitPercent = formData["benifitPercent" + i];
          benefitedVMS.push(benefit);
        }
        this.data.createOrder.benefitedVMS = benefitedVMS
      }
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      this.data.createOrder.isElectronic = formData.isElectronic;
      var that = this
      wx.showLoading({
        title: '加载中',
      })
      util.request(api.OrderSubmit, this.data.createOrder, 'POST').then(function(res) {
        wx.hideLoading();
        var result = res.data.code;
        if (result != '200') {
          // console.error('网络请求失败');
          wx.showModal({
            content: res.data.message,
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
          return;
        }
        var mdataJson = JSON.stringify(res.data.mdata)
        var payParam = {}
        payParam.polNo = res.data.mdata.polNo
        payParam.balance = res.data.mdata.balance
        payParam.openId = app.globalData.openId
        payParam.name = res.data.mdata.productName
        wx.showModal({
          content: '您试算保费金额为：' + res.data.mdata.balance + '，点击确认按钮投保',
          showCancel: true,
          success: function(res) {
            if (res.confirm) {
              if (that.data.isCollecting == true) {

                wx.navigateTo({
                  url: '../payment/index?mdata=' + JSON.stringify(payParam),
                })
                return;
              }
              wx.navigateTo({
                url: '../order/index?mdata=' + mdataJson,
              })
              return;
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      })
    } else {
      wx.showModal({
        content: '请阅读投保协议',
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
  },
  showButton: function(option) {
    var mdataJson = JSON.stringify(option)
    wx.showModal({
      content: '您试算保费金额为：' + option.balance + '，点击确认按钮投保',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../order/index?mdata=' + mdataJson,
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  applyinputname: function(e) {
    var applyVM = this.data.applyVM
    applyVM.name = e.detail.value
    this.setData({
      applyname: e.detail.value,
      applyVM: applyVM
    })
  },
  applycertcard: function(e) {
    var applyVM = this.data.applyVM
    var radioItems = this.data.radioItems
    applyVM.certId = e.detail.value
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!this.data.index == 0) {
      return false;
    } else {
      if (reg.test(applyVM.certId) === false) {
        wx.showToast({
          title: '身份证信息填写错误',
          icon: 'none',
        })
        return false;
      } else {
        applyVM.applyBirthday = util.getBirthday(applyVM.certId)
        var sex = util.getSex(e.detail.value)
        applyVM.sex = sex
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          if (radioItems[i].value == sex) {
            radioItems[i].checked = true;
          } else {
            radioItems[i].checked = false;
          }
        }
        this.setData({
          applycardnum: e.detail.value,
          date: [util.getBirthday(e.detail.value)],
          applyVM: applyVM,
          radioItems: radioItems
        })
      }
    }
  },
  applyphonenum: function(e) {
    var applyVM = this.data.applyVM
    applyVM.phone = e.detail.value
    this.setData({
      applyphone: e.detail.value,
      applyVM: applyVM
    })

  },
  applyemailadd: function(e) {
    var applyVM = this.data.applyVM
    applyVM.email = e.detail.value
    this.setData({
      applymailnum: e.detail.value,
      applyVM: applyVM
    })

  },
  insurecardInput: function(e) {
    var index = e.currentTarget.dataset.idx;
    var card = e.detail.value
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    } else {
      console.log(util.getBirthday(card))
      this.data.applyVM.certId = card
      this.data.applyVM.applyBirthday = util.getBirthday(card)
      var sex = util.getSex(card)
      // var radioItems = this.data.sexradioItems[index];
      var radioItems = this.data.radioItems
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        if (radioItems[i].value == sex) {
          radioItems[i].checked = true;
        } else {
          radioItems[i].checked = false;
        }
      }
      this.setData({
        // sexradioItems: this.data.sexradioItems
      });
      this.data.dates[index] = util.getBirthday(card);
      this.setData({
        radioItems: radioItems,
        dates: this.data.dates,
        applyVM: this.data.applyVM
      })
    }
  },
  insureTelInput: function(e) {
    var index = e.currentTarget.dataset.idx;
    var tel = e.detail.value
    this.data.applyVM.phone = tel
    this.setData({
      applyVM: this.data.applyVM
    })
  },
  insureNameInput: function(e) {
    var index = e.currentTarget.dataset.idx;
    var name = e.detail.value
    this.data.applyVM.name = name
    this.setData({
      applyVM: this.data.applyVM
    })
  },
  onConfirm(e) {
    console.log('onConfirm', e)
    this.setData({
      worktypeindex: 0,
    })
    var list = this.data.worktype
    console.log(e.detail.value)
    var len = list.length;
    var arr = [];
    //keyWord
    var reg = new RegExp(e.detail.value);
    arr = list.filter(function(s) {
      return s.match(reg);
    });
    console.log(arr)
    this.setData({
      worktypefilter: arr,
    })

  },
  bindPickerWorkChange: function(e) {
    this.setData({
      worktypeindex: 0

    })
    var occupation = this.data.worktypefilter[e.detail.value]
    var worktype = this.data.worktype
    var reg = new RegExp(occupation);
    for (var i = 0; i < worktype.length; i++) {
      if (worktype[i].match(reg)) {
        var occupationvalue = this.data.workcode[i]
      }

    }
    this.setData({
      occupation: occupationvalue,
      worktypeindex: e.detail.value

    })

  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      regioncode: e.detail.code,
      postCode: e.detail.postcode
    })
  },
  //受益人模块
  getBenefitType(e) {
    this.setData({
      benefit_type: e.currentTarget.dataset.type
    })
    console.log(e.currentTarget.dataset.type)
  },
  //受益关系
  getBenefitRel(e) {
    this.data.currentNavtabs[e.currentTarget.dataset.index] = e.currentTarget.dataset.idx
    this.data.relations[e.currentTarget.dataset.index] = this.data.benefit_relations[e.currentTarget.dataset.idx]
    this.setData({
      benefit_relation: e.currentTarget.dataset.relation,
      currentNavtabs: this.data.currentNavtabs,
      relations: this.data.relations
    })
    console.log(e.currentTarget.dataset.relation)
  },
  //出生日期
  bindDateChange2: function(e) {
    this.data.date_benefits[e.currentTarget.dataset.index] = e.detail.value
    this.setData({
      date_benefits: this.data.date_benefits
    })
  },
  //新增受益人
  addBenefit() {
    var benefit_mount = this.data.benefit_mount
    benefit_mount.push("新增"),
      this.data.date_benefits.push('1998-01-01')
    this.data.currentNavtabs.push('0')
    this.data.pickerRangeBenifits.push('第一顺位')
    this.data.pickerRangeBenifitsValue.push(1)
    this.data.pickerRangeBenifitRates.push("100%")
    this.data.identifyTypes.push({
      name: '居民身份证',
      value: '120001'
    })
    this.data.relations.push(this.data.benefit_relations[0])
    this.setData({
      benefit_mount: benefit_mount,
      currentNavtabs: this.data.currentNavtabs,
      date_benefits: this.data.date_benefits,
      pickerRangeBenifits: this.data.pickerRangeBenifits,
      pickerRangeBenifitRates: this.data.pickerRangeBenifitRates,
      identifyTypes: this.data.identifyTypes,
      relations: this.data.relations,
      pickerRangeBenifitsValue: this.data.pickerRangeBenifitsValue
    })
  },
  //移除受益人
  removeBenefit() {
    var benefit_mount = this.data.benefit_mount
    benefit_mount.pop();
    this.data.date_benefits.pop();
    this.data.currentNavtabs.pop();
    this.data.pickerRangeBenifits.pop();
    this.data.pickerRangeBenifitRates.pop();
    this.data.identifyTypes.pop();
    this.data.relations.pop()
    this.setData({
      benefit_mount: benefit_mount,
      currentNavtabs: this.data.currentNavtabs,
      date_benefits: this.data.date_benefits,
      pickerRangeBenifits: this.data.pickerRangeBenifits,
      pickerRangeBenifitRates: this.data.pickerRangeBenifitRates,
      identifyTypes: this.data.identifyTypes,
      relations: this.data.relations
    })
  },
  //受益顺序
  pickerRangeBenifitChange(e) {
    console.log(e.detail.value)
    this.data.pickerRangeBenifits[e.currentTarget.dataset.index] = this.data.pickerRangeBenifit[e.detail.value]
    this.data.pickerRangeBenifitsValue[e.currentTarget.dataset.index] = this.data.pickerRangeBenifitvalue[e.detail.value]
    this.setData({
      pickerRangeBenifits: this.data.pickerRangeBenifits,
      pickerRangeBenifitsValue: this.data.pickerRangeBenifitsValue
    })
  },
  //受益比例
  pickerRangeBenifitRate(e) {
    console.log(e.detail.value)
    this.data.pickerRangeBenifitRates[e.currentTarget.dataset.index] = this.data.pickerRangeBenifitRate[e.detail.value]

    this.setData({
      pickerRangeBenifitRates: this.data.pickerRangeBenifitRates
    })
  },
  //证件号
  bindIdentifyTypeChange(e) {
    console.log(e.detail.value)
    this.data.identifyTypes[e.currentTarget.dataset.index] = this.data.certs[e.detail.value]
    this.setData({
      identifyTypes: this.data.identifyTypes
    })
  },
  //保单类型 电子/纸质
  getTaxPayerReceipt(e) {
    this.setData({
      taxPayerReceipt: e.currentTarget.dataset.type
    })
    console.log(e.currentTarget.dataset.type)
  },
  //证件有效期
  validDateTypeChange(e) {
    console.log(e)
    console.log(e.detail.value)
    this.setData({
      validDateShow: 'true',
    })
    //validDateShow
    if (this.data.validDates[e.detail.value] == this.data.validDates[0]) {
      this.setData({
        validDateType: this.data.validDates[e.detail.value],
        validDate: '9999-12-31',
      })
      return;
    }
    var date = new Date();
    var current_date = moment(util.formatTime(date)).locale('zh-cn').format('YYYY-MM-DD');
    this.setData({
      validDateShow: '',
      validDate:current_date,
      validDateType: current_date
    })

  },
  validDateChange(e){
    console.log(e)
    this.setData({
      validDate: e.detail.value,
      validDateType: e.detail.value,
    })
    this.setData({
      validDateShow: 'true',
    })
  }
});