const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getToken = () => {
  try {
    var value = wx.getStorageSync('token')
    if (value) {
      return value
    }
  } catch (e) {
    // Do something when catch error
  }
}

const saveToken = token => {
  try {
    wx.setStorageSync('token', token)
  } catch (e) {}
}

const toast = msg => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}
const baseUrl = "https://www.trueman.xyz/"
//const baseUrl = "https://00bbc8ac.ngrok.io/"
const getUrl = url => {
  return baseUrl + url
}

const authRequest = param => {
  console.log("开始authRequest")
  console.log(param)
  let needLoading = true
  if (param.loading && param.loading == false) {
    needLoading = false
  }

  if (needLoading) {
    wx.showLoading({
      title: param.loadingMsg || '加载中',
    })
  }

  wx.request({
    url: getUrl(param.url),
    header: {
      'content-type': 'application/json', // 默认值
      'token': getToken()
    },
    success: function(res) {
      if (needLoading) {
        wx.hideLoading()
      }

      //console.log(res.data)
      const ret = res.data
      console.log(ret)
      if (ret.state == 401) {
        toast("请重新登录")
        wx.switchTab({
          url: '../index/index'
        })
      } else {
        if (param.success) {
          param.success(ret)
        }
      }
    },
    fail: function() {
      if (param.fail) {
        param.fail()
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getToken: getToken,
  saveToken: saveToken,
  toast: toast,
  getUrl: getUrl,
  authRequest: authRequest
}