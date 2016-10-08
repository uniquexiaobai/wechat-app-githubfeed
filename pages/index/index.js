const app = getApp();

Page({
  data: {
    motto: 'Feed',
  },

  onLoad() {
    const user = wx.getStorageSync('user');
    console.log(user);
    if(!user) {
      wx.navigateTo({
        url: '../auth/onboard/onboard'
      });
    }
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  goRouteSignIn() {
    wx.navigateTo({
      url: '../auth/onboard/onboard'
    });
  }
});
