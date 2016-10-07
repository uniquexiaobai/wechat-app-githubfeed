//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    motto: 'Feed',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goRouteSignIn: function() {
    wx.navigateTo({
      url: '../signin/signin'
    });
  },
  onLoad: function () {
    var user = wx.getStorageSync('user');

    console.log(user);
    if(!user) {
      wx.navigateTo({
        url: '../signin/signin'
      });
    }
  }
});
