import services from '../../utils/services';

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
    services.fetch(url).then(res => {
      if (res.data) {
        user = res.data;
        return services.fetch(user.organizations_url);
      }
    }).then(res => {
      if (res.data) {
        user.orgs = res.data;
        return services.fetch(`${user.repos_url}?sort=updated`);
      }
    }).then(res => {
      if (res.data) {
        user.repos = res.data;
        console.log('#user#', user);
        this.setData({ user: user });
        this.hideLoadingToast();
      }
    });
  },

  showLoadingToast() {
    wx.showToast({
      title: 'Loading',
      icon: 'loading', 
      duration: 10000
    });
  },

  hideLoadingToast() {
    wx.hideToast();
  }
});