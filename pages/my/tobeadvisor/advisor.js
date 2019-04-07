      // pages/my/tobeadvisor/advisor.js
import {
  $init,
  $digest
} from '../../../utils/common.util'
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var user = require('../../../utils/user.js')
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    index: 0,
    index2: 0,
    index3: 0,

    index4: 0, //工作性质
    index5: 0, //证书类型

    startdate: "1999-01-01",
    enddate: "2020-01-01",

    startdates: [],
    enddates: [],

    images: [],
    images2: [],

    certimageurl1: '',
    certimageurl2: '',

    workkind: ['入户', '市场', '营业厅', '待定'],
    licensetype: ['资格证', '执业证'],
    nation: ['汉族', '回族', '藏', '其他'],
    eduHight: ['本科', '专科', '硕士', '博士', '其他'],
    politicalStatus: ['群众', '党员', '团员'],
    region: ['点击选择省市', '', ''],
    customItem: '全部',
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

    createAdvisor: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $init(this)
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


  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },




  // 添加身份证正面的文件

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },


  // 添加身份证反面的文件


  chooseImage2(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images2 = this.data.images2.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images2 = images2.length <= 3 ? images2 : images2.slice(0, 3)
        $digest(this)
      }
    })
  },
  removeImage2(e) {
    const idx = e.target.dataset.idx
    this.data.images2.splice(idx, 1)
    $digest(this)
  },
  handleImagePreview2(e) {
    const idx = e.target.dataset.idx
    const images2 = this.data.images2
    wx.previewImage({
      current: images2[idx], //当前预览的图片
      urls: images2, //所有要预览的图片
    })
  },
  //  影像文件结束






  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  bindPickerChangeedu: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChangepolitical: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },

  bindWorkChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },

  bindLicenseChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
  },


  bindStartChange: function(e) {

    var index = e.currentTarget.dataset.id;
    this.data.startdates[index] = e.detail.value;
    this.setData({
      startdates: this.data.startdates,
      startdate: e.detail.value
    })
  },



  bindEndChange: function(e) {

    var index = e.currentTarget.dataset.id;
    this.data.enddates[index] = e.detail.value;
    this.setData({
      enddates: this.data.enddates,
      enddate: e.detail.value
    })
  },





  // 提交form表单
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;

    // 这里成为创客就是 
    // this.data.createAdvisor.advisorId = 2;

    this.data.createAdvisor.name = formData.applyName;
    this.data.createAdvisor.certId = formData.applyCard;
    this.data.createAdvisor.phone = formData.applyeTel;

    this.data.createAdvisor.bankName = formData.applybankname;
    this.data.createAdvisor.bankBranch = formData.applybankbranch;
    this.data.createAdvisor.bankCardId = formData.applybanknum;

    this.data.createAdvisor.nation = formData.nation;
    this.data.createAdvisor.eduExperience = formData.eduheight;

    this.data.createAdvisor.politicalFace = formData.political;
    this.data.createAdvisor.sex = formData.insureSex;

    // this.data.createAdvisor.province = formData.servicelocation[0];
    // this.data.createAdvisor.city = formData.servicelocation[1];

    //工作性质
    this.data.createAdvisor.workKind = formData.workkind;
    this.data.createAdvisor.licenseType = formData.licensetype;
    this.data.createAdvisor.licenseNum = formData.applylicensenum;

    this.data.createAdvisor.licenseStartDate = formData.licensestart;
    this.data.createAdvisor.licenseEndDate = formData.licenseend;
    this.data.createAdvisor.openId = app.globalData.openId;


    console.log(this.data.images)
    console.log(this.data.images2)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)


    wx.navigateTo({
      url: 'examine/examine'
    })

    
    // wx.uploadFile({
    //   url: app.globalData.api + app.globalData.advisor + 'wechatimage/upload', //仅为示例，非真实的接口地址
    //   filePath: this.data.images[0],
    //   name: 'file',
    //   formData: {

    //   },
    //   success(res) {

    //     const data = res.data

    //     if (res.statusCode == '200') {
    //       that.data.createAdvisor.certImageURL1 = res.data;



    //       wx.uploadFile({
    //         url: app.globalData.api + app.globalData.advisor + 'wechatimage/upload', //仅为示例，非真实的接口地址
    //         filePath: that.data.images2[0],
    //         name: 'file',
    //         formData: {

    //         },
    //         success(res) {
    //           if (res.statusCode == '200') {
    //             that.data.createAdvisor.certImageURL2 = res.data;
    //             util.request(api.SignContract, that.data.createAdvisor, 'POST').then(function(res) {
    //               var mdata = res.data
    //               var toastText = "操作成功！";
    //               wx.navigateTo({
    //                 url: 'examine/examine'
    //               })

    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // });
  },
})