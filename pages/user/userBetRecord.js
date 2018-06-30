// pages/user/userBetRecord.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    userId: null,
    nickname: "未知",
    bets: [{
      name: "主队胜",
      value: 3,
      color: "#33cc33"
    }, {
      name: "平",
      value: 1,
      color: "#00aaff"
    }, {
      name: "主队负",
      value: 0,
      color: "#ff0000"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userId = options.userId
    const nickname = options.nickname
    this.setData({
      userId: userId,
      nickname: nickname
    })
    this.loadRecords()
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
  loadRecords: function() {
    const that = this
    const userId = this.data.userId
    console.log("loadRecords---" + userId)
    util.authRequest({
      url: "userInfo/userBetRecord/" + userId,
      success: function(ret) {
        if (ret.state == 1) {
          let datas = []
          ret.data.forEach(function(data) {
            console.log(data.betResult)
            if (data.betResult == 2) {
              data.betResultImg = util.getUrl("images/icon/right.png")
            } else if (data.betResult == 1) {
              data.betResultImg = util.getUrl("images/icon/wrong.png")
            } else {
              data.betResultImg = util.getUrl("images/icon/not-result.png")
            }
            console.log(data)
            datas.push(data)
          });
          that.setData({
            records: datas
          })
        } else {
          util.toast("加载失败")
        }
      }
    })
  },
  radioChange: function(event) {
    const recordId = event.target.dataset.recordid
    const bet = event.detail.value
    util.authRequest({
      url: "userInfo/bet?recordId=" + recordId+"&bet="+bet,
      success: function(ret) {
        if (ret.state == 1) {
          util.toast("保存成功")
        } else {
          util.toast("保存失败")
        }
      }
    })
  }
})