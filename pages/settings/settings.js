
Page({
  handleLogoutTap: function() {
    wx.clearStorageSync();
    wx.navigateTo({
      url: '../signin/signin'
    });
  }
});
