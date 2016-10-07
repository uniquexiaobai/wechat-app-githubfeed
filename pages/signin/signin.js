
var app = getApp();

Page({
  handleSigninSubmit(e) {
    var user = { username: e.detail.value.username };
    wx.setStorageSync('user', user);
    wx.navigateTo({
      url: '../index/index'
    });
  }
});
