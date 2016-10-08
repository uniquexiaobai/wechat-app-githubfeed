
const app = getApp();

Page({
  handleSigninSubmit(e) {
    const user = { username: e.detail.value.username };
    wx.setStorageSync('user', user);
    wx.navigateTo({
      url: '../index/index'
    });
  }
});
