// pages/user/index.js
Page({
  data: {
    userinfo:{}
  },
  onShow: function () {
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({userinfo});
  }
})