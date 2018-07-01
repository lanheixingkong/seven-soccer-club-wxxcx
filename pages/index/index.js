//index.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isAdmin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.checkToken()
  },
  onShow: function() {
    console.log("hasUserInfo:" + this.data.hasUserInfo)
    console.log("canIUse:" + this.data.canIUse)
    console.log(this.data.userInfo)
  },
  getUserInfo: function() {
    if (!this.data.userInfo.nickName) {
      const that = this
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          motto: "Hello " + app.globalData.userInfo.nickName
        })
        that.saveUserInfo()
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            motto: "Hello " + app.globalData.userInfo.nickName
          })
          that.saveUserInfo()
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
              motto: "Hello " + app.globalData.userInfo.nickName
            })
            that.saveUserInfo()
          }
        })
      }
    }
  },
  login: function() {
    console.log("开始登录操作")
    const that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: util.getUrl('index/login'),
            data: {
              code: res.code
            },
            success: function(res) {
              const ret = res.data
              if (ret.state == 1) {
                console.log("登录成功")
                util.saveToken(ret.data.token)
                that.setData({
                  isAdmin: ret.data.admin == 1
                })
                that.getUserInfo()
              } else if (ret.state == 100) {
                console.log("登录成功，未激活")
                util.saveToken(ret.data)
                //新用户
                that.setData({
                  hasUserInfo: false
                })
              } else {
                util.toast("登录失败")
              }
            },
            fail: function() {
              console.log("login请求失败")
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  checkToken: function() {
    console.log("开始校验token操作")
    const that = this
    const token = util.getToken()
    console.log("token:" + token)
    if (token) {
      //校验token有效性
      //发起网络请求
      wx.request({
        url: util.getUrl('index/check/' + token),
        success: function(res) {
          const ret = res.data
          if (ret.state == 1) {
            console.log("token有效")
            that.setData({
              isAdmin: ret.data.admin == 1
            })
            that.getUserInfo()
          } else if (ret.state == 100) {
            console.log("token有效，未激活")
            //新用户
            that.setData({
              hasUserInfo: false
            })
          } else {
            console.log("token过期，重新登录")
            that.login()
          }
        },
        fail: function() {
          console.log("valid请求失败")
        }
      })
    } else {
      that.login()
    }
  },
  saveUserInfo: function() {
    const that = this
    const userInfo = this.data.userInfo
    const token = util.getToken()
    wx.showLoading({
      title: '登录中'
    })
    wx.request({
      url: util.getUrl('index/userinfo'),
      header: {
        'token': token
      },
      data: userInfo,
      success: function(res) {
        wx.hideLoading()
        const ret = res.data
        if (ret.state == 1) {
          that.setData({
            hasUserInfo: true
          })
          wx.navigateTo({
            url: '../user/user'
          })
        } else {
          util.toast("登录失败")
        }
      },
      fail: function() {
        wx.hideLoading()
        console.log("valid请求失败")
      }
    })
  },
  bindViewTap: function(e) {
    if (this.data.hasUserInfo && this.data.userInfo.nickName) {
      wx.navigateTo({
        url: '../user/user',
      })
    } else {
      this.checkToken()
    }

  },
  bindAdminTap: function(e){
    if(this.data.isAdmin){
      wx.navigateTo({
        url: '../admin/admin',
      })
    }
  }
})