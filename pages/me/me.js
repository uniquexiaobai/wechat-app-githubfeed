
var app = getApp();
Page({
  data: {
    login: 'uniquexiaobai',
    avatar_url: "https://avatars.githubusercontent.com/u/12796673?v=3"
  },

  goRouteSettings: function() {
    wx.navigateTo({
      url: '../settings/settings'
    });
  }
});
