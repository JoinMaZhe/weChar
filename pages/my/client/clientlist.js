var app = getApp()
var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
Page({
  data: {
    listData: [],
    showModal: false,
    show: false,
    username: '',
    addIdx: '',
    certId: '',
    lableName: '',
    clientLable: [],
    curPage: 0,
    pageSize: 10,
    haseMore:true,
    remind:'加载中'
  },
  onLoad: function() {
    console.log('onLoad' + app.globalData.advisorId)
    var that = this
    that.getClientList(that)

  },
  getClientList: function(option) {
    var that = this;
    
    /* wx.showLoading({
      "mask": true
    }) */
    that.setData({
      remind: '加载中'
    });
    var data= {
      page: that.data.curPage,
        size: that.data.pageSize
    }
    var url = api.ClientsList + app.globalData.advisorId
    util.request(url, data, 'GET').then(function (res) {
        setTimeout(function () {
          that.setData({
            remind: ''
          });
        }, 2000);
        // wx.hideLoading()
        var list = res.data.datalist;
        if (list == null) {
          var toastText = res.data.message;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          for (let i = 0, len = list.length; i < len; i++) {
            // list[i].polNo = list[i].polNo.substring(0, 8) +
            //   '...';
            list[i].isExistPhoneNum = true;
            if (list[i].applyVM == undefined) {
              list[i].isExistPhoneNum = false;
            } else {
              if (list[i].applyVM.applyTel == undefined || list[i].applyVM.applyTel.length == 0) {
                list[i].isExistPhoneNum = false;
              }
            }
          }
          var lables = [];
          for (let i = 0, len = list.length; i < len; i++) {
            var lable = [];
            lable = (list[i].customerLable || '').split(',');
            console.log("这是第" + i + "组标签" + lable);
            console.log(lable);
            lables.push(lable);
            that.setData({
              clientLable: lables
            });
            // console.log(that.data.clientLable)
          }
          that.setData({
            listData: list
          });
      }
    })
  },

  toInfoTip: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: 'clientorder/clientorder?certid=' + ds.id
    })
  },
  onChange1(event) {
    this.setData({
      lableName: event.detail
    })
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  showCustomDialog: function(e) {
    var ds = e.currentTarget.dataset;
    this.setData({
      username: '',
      show: true,
      certId: ds.lableid,
      addIdx: ds.idx
    });
  },

  //  删除标签
  // 添加标签


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



  confirmM: function() {
    console.log("标签" + this.data.lableName);
    console.log("openId：" + app.globalData.openId); //wx.getStorageSync('openId'));
    wx.request({

      // url: "http://localhost:9612/api/advisor/addlablebycertid" ,
      url: app.globalData.api + app.globalData.advisor + 'addlablebycertid',
      method: 'POST',
      data: {
        certId: this.data.certId,
        lableName: this.data.lableName,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {

        var toastText = res.data.data;
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });


        this.data.clientLable[this.data.addIdx].push(this.data.lableName);
        this.setData({
          clientLable: this.data.clientLable
        });

        // wx.navigateTo({
        //   url: '/pages/my/client/clientlist'
        // })

      }
    })

  },






  deletelable: function(e) {
    var that = this;

    var ds = e.currentTarget.dataset;
    //app.globalData.advisorId='000'
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '确定删除《' + ds.name + '》标签?',
      success: function(res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.api + app.globalData.advisor + 'deletelablebycertid',
            method: 'POST',
            data: {
              certId: ds.lableid,
              lableName: ds.name,
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: res => {

              var toastText = res.data.data;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });

              // 这里直接操作数组 
              // that.data.clientLable=  that.data.clientLable[ds.idx].replace(ds.name, "");

              for (var i = 0; i < that.data.clientLable[ds.idx].length; i++) {
                if (that.data.clientLable[ds.idx][i] == ds.name) {
                  that.data.clientLable[ds.idx].splice(i, 1);


                  that.setData({
                    clientLable: that.data.clientLable
                  });


                }
              }






              // wx.navigateTo({
              //   url: '/pages/my/client/clientlist'
              // })

            }
          });

        }
      }
    })


  },

  call(e) {
    console.log("投保人电话号码为：", e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }

    })
  },
  onReachBottom: function() {
    if (this.data.listData.length<this.data.pageSize){
      this.setData({
        curPage: this.data.curPage,
        haseMore:false
      });  
    }else{
      this.setData({
        curPage: this.data.curPage + 1
      });
      this.getClientList(true)
      
    }
  },
  onPullDownRefresh: function() {
    if (this.data.curPage == 0) {
      return;
    }
    this.setData({
      curPage: this.data.curPage - 1,
       haseMore: true
    });
    this.getClientList()
  }


})