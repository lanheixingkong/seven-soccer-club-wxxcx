// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [{
      "group": "A组",
      "teams": [{
        "ranking": 1,
        "logo": "http://duihui.qiumibao.com/zuqiu/agenting.png",
        "name": "阿根廷",
        "count": 0,
        "sheng": 0,
        "ping": 0,
        "fu": 0,
        "goal": "0/0",
        "score": 0
      }, {
        "ranking": 2,
        "logo": "http://duihui.qiumibao.com/zuqiu/agenting.png",
        "name": "荷兰",
        "count": 0,
        "sheng": 0,
        "ping": 0,
        "fu": 0,
        "goal": "0/0",
        "score": 0
      }]
    }, {
      "group": "B组",
      "teams": [{
        "ranking": 1,
        "logo": "http://duihui.qiumibao.com/zuqiu/agenting.png",
        "name": "阿根廷",
        "count": 0,
        "sheng": 0,
        "ping": 0,
        "fu": 0,
        "goal": "0/0",
        "score": 0
      }, {
        "ranking": 2,
        "logo": "http://duihui.qiumibao.com/zuqiu/agenting.png",
        "name": "荷兰",
        "count": 0,
        "sheng": 0,
        "ping": 0,
        "fu": 0,
        "goal": "0/0",
        "score": 0
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  loadSchedules() {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.trueman.xyz/score/worldcup/2018',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        //console.log(res.data)
        const ret = res.data
        if (ret.state == 1) {
          that.setData({
            //scores = ret.data
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

