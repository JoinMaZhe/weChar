import {
  $wuxSelect
} from '../../../dist/index'
var app = getApp()
Page({
  data: {
    hideShopPopup:true,
    premium:0,
    imgUrl:app.globalData.fileUrl+'group1/M00/00/00/CiWSS1w3I9qAKsNZAAIQV68JslA705.jpg'
   , value2: ['yourself', 'couple', 'parent', 'children'],
    value2Item:'',
    title1: "请选择",
    sexyTetle: "请选择",
    //male-1.5,famale-1
    sexyValue: [1.5, 1],
    sexyValueItem:'',
    coverageTetle: "请选择",
    coverageValue: ['life'],
    coverageValueItem:'',
    payTetle: "请选择",
    //20Y-1，10Y-2
    payValue: ['2', "1"],
    payValueItem: '',
    payOptions: [
      '10年交',
      '20年交'
    ],
    planTetle: "请选择",
    planValue: ['1', "2", '3', '4', '5', '6', '7', '8', '9', '10'],
    planValueItem: '',
    jobTetle: "请选择",
    jobValue: ['1P', "20P", '30P', '4P', '5P', '6P'],
    jobValueItem:'',
    educationTetle: "请选择",
    educationValue: ['middle', "high", 'bachelor', 'master', 'docter'],
    date: '2000-01-01',
    age: 18
  },
  onClick1() {
    $wuxSelect('#wux-select1').open({
      value: this.data.value2,
      options: [
        '自己',
        '配偶',
        '父母',
        '子女',
      ],
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          value2Item: this.data.value2[index],
          title1: options[index],
        })
      },
    })
  },
  onClicksexy() {
    $wuxSelect('#wux-selectsexy').open({
      value: this.data.sexyValue,
      options: [
        '男',
        '女'
      ],
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          sexyValueItem: this.data.sexyValue[index],
          sexyTetle: options[index],
        })
      },
    })
  },
  onClickCoverage() {
    $wuxSelect('#wux-selectCoverage').open({
      value: this.data.sexyValue,
      options: [
        '终身'
      ],
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          coverageValueItem: this.data.coverageValue[index],
          coverageTetle: options[index],
        })
      },
    })
  },
  onClickPay() {
    $wuxSelect('#wux-selectPay').open({
      value: this.data.payValue,
      options: this.data.payOptions,
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          payValueItem: this.data.payValue[index],
          payTetle: options[index],
        })
      },
    })
  },
  onClickPlan() {
    $wuxSelect('#wux-selectPlan').open({
      value: this.data.planValue,
      options: [
        '10万元',
        '20万元',
        '30万元',
        '40万元',
        '50万元',
        '60万元',
        '70万元',
        '80万元',
        '90万元',
        '100年元'
      ],
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          planValueItem: this.data.planValue[index],
          planTetle: options[index],
        })
      },
    })
  },

  onClickJob() {
    $wuxSelect('#wux-selectJob').open({
      value: this.data.jobValue,
      options: [
        '一类',
        '二类',
        '三类',
        '四类',
        '五类',
        '六类'
      ],
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          jobValueItem: this.data.jobValue[index],
          jobTetle: options[index],
        })
      },
    })
  },

  onClickEducation() {
    $wuxSelect('#wux-selectEducation').open({
      value: this.data.educationValue,
      options: [
        '初中',
        '高中',
        '本科',
        '硕士',
        '博士'
      ],
      onConfirm: (value, index, options) => {
        console.log('-----------------------------')
        console.log(value, index, options)
        this.setData({
          educationValueItem: this.data.educationValue[index],
          educationTetle: options[index],
        })
      },
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const strBirthday = e.detail.value;
    const age = this.jsGetAge(strBirthday);

    console.log('被保人年龄为：', age)
    if (age < 18) {
      wx.showModal({
        content: '被保人的年龄不能小于18岁',
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
    }
    if (age > 50) {
      this.setData({
        payValue: ['2'],
        payOptions: [
          '10年交'
        ],
      })
    }
    if (age > 60) {
      wx.showModal({
        content: '被保险人的年龄不能大于60岁',
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
    }
    this.setData({
      date: e.detail.value,
      age: age
    })
  },
  formSubmit(e) {
    if (this.data.sexyTetle == '请选择' || this.data.title1 == "请选择" || this.data.coverageTetle == "请选择" || this.data.payTetle == "请选择" || this.data.planTetle == "请选择" || this.data.educationTetle == "请选择") {
      wx.showModal({
        content: '信息不完整',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            return
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          this.onLoad();

        }

      })
    } else {
      var premium = 1332;
      console.log(this.data.age, this.data.sexyValueItem, this.data.payValueItem, this.data.planValueItem)
      premium = (premium + 4 * this.data.age + 5 * this.data.sexyValueItem) * this.data.planValueItem;
      premium=Math.ceil(premium/100)+"00";
      console.log('premium', premium);
       /* wx.showModal({
       title: '您在重疾保险的年投入建议为:',
        content: premium + '(元)',
        showCancel: false,
        confirmText: '重新计算',
        success: function(res) {
          if (res.confirm) {
            return
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          //this.onLoad();

        }

      }) */
      this.setData({
        premium: premium,
        hideShopPopup:false
      })
    }

  },

  /*根据出生日期算出年龄*/
  jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay; //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
      }
    }

    return returnAge; //返回周岁年龄

  },
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  tobuy:function(){
    console.log('点击购买')
    wx.switchTab({
      url: '../../discovery/discovery'
    })
  }
})