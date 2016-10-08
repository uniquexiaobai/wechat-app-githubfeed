
const app = getApp();
const services = require('../../../utils/services.js');

function debounce(func, wait) {
  var last, context, args;
  var args = arguments;
  return function() {
    context = this;
    args = arguments;
    clearTimeout(last);
    last = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  }
}

const basic_url = 'https://api.github.com/users/';

function isUserExisted(e) {
  const url = basic_url + e.detail.value;
  services.fetch(url).then(res => {
    if (res.data.avatar_url) {
      app.getCurrentPage().setData({
        avatar_url: res.data.avatar_url,
        error_msg_hidden: true
      });
    } else {
      app.getCurrentPage().setData({
        avatar_url: '/img/octocat.png',
        error_msg_hidden: false
      });
    }
  });
}

Page({
  data: {
    avatar_url: '',
    error_msg_hidden: true
  },

  onLoad() {
    this.setData({
      avatar_url: '/img/octocat.png'
    });
  },

  handleOnboardSubmit(e) {
    const url = basic_url + e.detail.value.username;
    services.fetch(url).then(res => {
      if (res.data.avatar_url) {
        const user = {
          username: e.detail.value.username,
          avatar_url: res.data.avatar_url
        };
        wx.setStorageSync('user', user);
        wx.navigateTo({
          url: '../../index/index'
        });
      } else {
        this.setData({
          avatar_url: '/img/octocat.png',
          error_msg_hidden: false
        });
      }
    });
  },

  handleInputChange: debounce(isUserExisted, 1000)
});
