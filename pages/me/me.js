const app = getApp();

Page({
  data: {
    
  },

  onReady() {
    const user = wx.getStorageSync('user');

    if (user) {
      this.setData({ user: user });
    }
  },

  goRouteSettings() {
    wx.navigateTo({ 
      url: '../settings/settings'
    });
  }
});
