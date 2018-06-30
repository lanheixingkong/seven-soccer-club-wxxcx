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

module.exports = {
  formatTime: formatTime,
  getToken: getToken,
  saveToken: saveToken,
  toast: toast,
  getUrl: getUrl
}