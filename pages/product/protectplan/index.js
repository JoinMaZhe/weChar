// pages/product/protectplan/index.js
Page({
      /**
       * 页面的初始数据
       */
      data: {
        current: 0,
        isSelected: false,
        back: false,
        index: 0,
        radio0: '1',
        radio1: '1',
        radio2: '1',
        radio3: '1',
        questions: [
          //{
        //     "question": "1.您是否有社保？",
        //     "question2": "",
        //     "radio": '1',
        //     'picture': ["../../../images/unshebao.png", "../../../images/shebao.png"],
        //     "option": [{
        //         'question': "无",
        //         'picture': "../../../images/unshebao.png",
        //         'value': 'illnessinsurance',
        //         'isSelected': false,
        //       },
        //       {
        //         'question': "有",
        //         'picture': "../../../images/shebao.png",
        //         'value': 'b',
        //         'isSelected': false,
        //       }
        //     ],
        //   }, 
        {
        "question": "您是有车一族吗？",
        "question2": '',
        "radio": '1',
        'isSelected': false,
        'picture': ["../../../images/mycar.png"],
        "option": [
          {
            'question': "没有",
            'picture': "../../../images/home.png",
            'value': '',
            'isSelected': false,
          },
          {
            'question': "有",
            'picture': "../../../images/home.png",
            'value': 'carinsurance',
            'isSelected': false,
          }
        ],
      },
      {
        "question": "您出差频繁吗？",
        "question2": '一年中出差次数',
        'isSelected': false,
        "radio": '1',
        'picture': ["../../../images/chuchai.png"],
        "option": [{
          'question': "少于5次 ",
            'picture': "../../../images/home.png",
            'value': 'accidentinsurance',
            'isSelected': false,
          },
          {
            'question': "多于5次",
            'picture': "../../../images/home.png",
            'value': '2',
            'isSelected': false,
          }
        ],
      },
      {
        "question": "您家中有老人吗？",
        "radio": '1',
        'isSelected': false,
        'picture': ["../../../images/home.png", "../../../images/home.png"],
        "option": [
          {
            'question': "没有",
            'picture': "../../../images/unolder.png",
            'value': '3',
            'isSelected': false,
          },
          {
            'question': "有",
            'picture': "../../../images/olders.png",
            'value': 'familymedicalinsurance',
            'isSelected': false,
          }
        ],
      },
      /* {
         "question": "5.您有贷款吗？",
         "radio": '1',
         'isSelected': false,
         'picture': ['../../../images/loan.png'],
         "option": [{
             'question': "有",
             'value': 'a',
             'isSelected': false,
           },
           {
             'question': "无",
             'value': '4',
             'isSelected': false,
           }
         ],
       },*/
      // {
      //   "question": "6.您有房吗？",
      //   "question2": '拥有房的数量',
      //   "radio": '1',
      //   'isSelected': false,
      //   'picture': ['../../../images/house.png'],
      //   "option": [{
      //       'question': ">=1",
      //       'value': 'gasinsurance',
      //       'isSelected': false,
      //     },
      //     {
      //       'question': "<1",
      //       'value': '5',
      //       'isSelected': false,
      //     }
      //   ],
      // },
      {
        "question": "您喜欢旅游吗？",
        "question2": '您一年旅游的次数',
        "radio": '1',
        'isSelected': false,
        'picture': ['../../../images/tourism.png'],
        "option": [{
            'question': "多于5次",
            'value': 'airinsurance',
            'isSelected': false,
          },
          {
            'question': "少于5次",
            'value': '6',
            'isSelected': false,
          }
        ],
      },
      {
        "question": "您经常吸烟喝酒吗？",
        "radio": '1',
        'isSelected': false,
        'picture': ['../../../images/yj.png'],
        "option": [{
          'question': "烟酒不沾",
          'value': '8',
          'isSelected': false,
        },{
            'question': "偶尔",
            'value': 'illnessinsurance',
            'isSelected': false,
          }

        ],
      }
    ],
    questionCount: 4,
    answerArray: [],
  },

  onClick() {
    const current = this.data.current + 1 > 3 ? 0 : this.data.current + 1
    this.setData({
      current,
    })
  },
  goback: function() {
    if (this.data.index < 1) {
      this.setData({
        index: this.data.index,
        current: this.data.current,
        back: false,
        isSelected: false

      });
    } else {
      this.setData({
        index: this.data.index - 1,
        current: this.data.current - 1,
        back: true,
        isSelected: false
      });
    }
  },
  //点击选项触发函数
  select: function(event) {
    console.log('携带option值为：', event.currentTarget.dataset.option)
    console.log('携带value值为：', event.currentTarget.dataset.value)
    var arr = this.data.answerArray;
    var questions = this.data.questions;
    questions[event.currentTarget.dataset.option].option[event.currentTarget.dataset.select].isSelected = true
    this.setData({
      questions: questions
    });
    arr.push(event.currentTarget.dataset.value)
    if (event.currentTarget.dataset.option == this.data.questionCount - 1) {
      this.setData({
        isSelected: true
      });
    }
    setTimeout(function() {
      if (this.data.current < this.data.questionCount - 1) {
        this.setData({
          index: this.data.index + 1,
          current: this.data.current + 1,
          answerArray: arr
        });
      } else {
        this.setData({
          index: this.data.index,
          current: this.data.current,
          answerArray: arr
        });
      }

    }.bind(this), 1000);
  },
  submit: function() {

    wx.navigateTo({
      url: '../protectplan/analyze/index?insuranceTypeCodeList=' + JSON.stringify(this.data.answerArray)
    })
    /* wx.navigateTo({
       url: '../recommand/recommand?insuranceTypeCodeList=' + JSON.stringify(this.data.answerArray)
     })*/
  },
  onChange(event) {
    const {
      key
    } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });

    var arr = this.data.answerArray;
    if (arr[event.currentTarget.dataset.option]) {
      arr[event.currentTarget.dataset.option] = event.detail
    } else {
      arr.push(event.detail)
    }
    if (event.currentTarget.dataset.option == this.data.questionCount - 1) {
      this.setData({
        isSelected: true
      });
    }
    setTimeout(function() {
      if (this.data.current < this.data.questionCount - 1) {
        this.setData({
          index: event.currentTarget.dataset.option + 1,
          current: this.data.current + 1,
          answerArray: arr
        });
      } else {
        this.setData({
          index: this.data.index,
          current: this.data.current,
          answerArray: arr
        });
      }

    }.bind(this), 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //
    this.setData({
      questionCount: this.data.questions.length
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

  }
})