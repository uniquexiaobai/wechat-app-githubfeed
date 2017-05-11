import { fetch } from '../../utils/services';

Page({
  onLoad(options) {
    this.setData({
      user_name: options.user_name
    });

    const user_url = `https://api.github.com/users/${this.data.user_name}`;
    this.fetchUserData(user_url);
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.user_name
    });
  },

  fetchUserData(url) {
    let user;

    this.showLoadingToast();
    fetch(url).then(res => {
      if (res.statusCode === 200) {
        user = res.data;
        return fetch(user.organizations_url);
      }
    }).then(res => {
      if (res.statusCode === 200) {
        user.orgs = res.data;
        return fetch(`${user.repos_url}?sort=updated`);
      }
    }).then(res => {
      if (res.statusCode === 200) {
        user.repos = res.data;
        console.log('#user#', user);
        this.setData({ user: user });
      }
      this.hideLoadingToast();
    });
  },

  showLoadingToast() {
    wx.showLoading({
      title: 'Loading',
      mask: true
    });
  },

  hideLoadingToast() {
    wx.hideLoading();
  }
});