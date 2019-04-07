// pages/insure/index.js
var util = require('../../utils/util.js')
var moment = require('../../utils/moment.js')
const app = getApp()
Page({
  data: {
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
    resetButton: true,
    index: 0

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
    console.log('投保人', e.detail.value)
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
      startDate: start,
      endDate: end,
      product: mdata,
      productCode: mdata.code,
      insureComCode: mdata.insureComCode,
      productId: mdata.id,
      suiteId: mdata.planId,
      planCode: mdata.plancode

    })
    wx.request({
      url: app.globalData.api + app.globalData.advisor + 'getsigninfo/' + app.globalData.openId,
      data: {},
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success: function(res) {
        //typeof (loginFlag) != "undefined"
        var entity = res.data.data;
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
      }
    });
    //调用应用实例的方法获取全局数据
    // this.productDetial(mdata.id);
  },
  onShow: function() {
    var that = this;
    var advisorId = app.globalData.advisorId
    console.log(app.globalData.advisorId)
    if (advisorId == '000') {
      wx.request({
        url: app.globalData.api + app.globalData.advisor + 'getsigninfo/' + app.globalData.openId,
        data: {},
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        success: function(res) {
          var entity = res.data.data;
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
        }
      });

    } else {
      that.setData({
        advisorId: advisorId
      })
    }
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
    if (cb.length == 4) {
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
    if (cb.length == 1) {
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
    this.data.applyVM.applyAdress = "";
    this.data.applyVM.applySex = util.getSex(formData.applyCard);
    this.data.applyVM.applyBirthday = util.getBirthday(formData.applyCard);
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
      this.data.insuredVMS.push(insued);
    }
    this.data.createOrder.insuredVMS = this.data.insuredVMS;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.api + app.globalData.order + 'create/order',
      //url:'create/order',
      method: 'POST',
      data: this.data.createOrder,
      header: {
        'Content-Type': 'application/json'
      },

      complete: function(res) {
        wx.hideLoading();

        var result = res.data.data.code;
        if (result != '200') {
          // console.error('网络请求失败');
          wx.showModal({
            content: res.data.data.message,
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
        /*var result = res.statusCode
        var mdata = res.data.data.mdata
        var toastText = "操作成功！";
        if (result != 200) {
          toastText = "操作失败";
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 5000
        });*/
        //that.showButton(res.data.data.mdata);
        var mdataJson = JSON.stringify(res.data.data.mdata)
        wx.showModal({
          content: '您试算保费金额为：' + res.data.data.mdata.balance + '，点击确认按钮投保',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              if (this.data.productCode == "HYXH001") {

                this.data.product.polNo = res.data.data.mdata.polNo
                this.data.product.balance = res.data.data.mdata.balance
                wx.navigateTo({
                  url: '../../payment/index?mdata=' + JSON.stringify(this.data.product),
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
      }
    })
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

});