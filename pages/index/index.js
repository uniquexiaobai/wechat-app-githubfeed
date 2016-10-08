const app = getApp();

Page({
  data: {
    motto: 'Feed',
  },

  onLoad() {
    console.log(wx.getStorageSync('user'));
    if(!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../signin/signin'
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
      url: '../signin/signin'
    });
  }
});
