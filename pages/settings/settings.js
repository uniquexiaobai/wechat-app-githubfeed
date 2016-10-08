
Page({
  handleLogoutTap() {
    wx.clearStorageSync();
    wx.redirectTo({
      url: '../signin/signin'
    });
  }
});
