function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
  //+ ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};

function getData(url) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function(res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}


module.exports.getData = getData;

function getBirthday(cardNo) {
  if (15 == cardNo.length) {
    var year = cardNo.substring(6, 8);
    var month = cardNo.substring(8, 10);
    var day = cardNo.substring(10, 12);
    var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
  } else if (18 == cardNo.length) { // 18 == cardNo.length
    var year = cardNo.substring(6, 10);
    var month = cardNo.substring(10, 12);
    var day = cardNo.substring(12, 14);
    var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
  }
  return formatDate(birthday);
}

function formatDate(date) {
  if (undefined == date) {
    return;
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}
module.exports.getBirthday = getBirthday;

function getSex(cardNo) {
  var sex = cardNo.substring(16, 17);
  return sex % 2 == 0 ? 'F' : 'M';
}
module.exports.getSex = getSex;

/* 根据出生日期算出年龄 */
function getAge(strBirthday) {
  var returnAge = {
    year: 0,
    day: 0
  };
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var now = new Date();
  var nowYear = now.getFullYear();
  var nowMonth = now.getMonth() + 1;
  var nowDay = now.getDate();

  if (nowYear == birthYear) {
    returnAge.year = 0; // 同年 则为0岁
    var birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    var life = parseInt((now - birthDate) / 24 / 3600 / 1000); //计算天数
    returnAge.day = life;
  } else {
    var ageDiff = nowYear - birthYear; // 年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; // 日之差
        if (dayDiff < 0) {
          returnAge.year = ageDiff - 1;
        } else {
          returnAge.year = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; // 月之差
        if (monthDiff < 0) {
          returnAge.year = ageDiff - 1;
        } else {
          returnAge.year = ageDiff;
        }
      }
    } else {
      returnAge.year = -1; // 返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; // 返回周岁年龄
}
module.exports.getAge = getAge;


/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Xabx-Token': wx.getStorageSync('token')
      },
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/authorize/authorize'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}
module.exports.request = request;

/* 获取当前位置 */
function getLocation() {
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
}

module.exports.getLocation = getLocation;