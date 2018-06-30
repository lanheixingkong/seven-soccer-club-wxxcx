// pages/score/score.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadScoreRankings()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadScoreRankings()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadScoreRankings() {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: util.getUrl('scoreRanking/worldcup/2018'),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        //console.log(res.data)
        const ret = res.data
        console.log(ret)
        if (ret.state == 1) {
          that.setData({
            scores: ret.data
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})

