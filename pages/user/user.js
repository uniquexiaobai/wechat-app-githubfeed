import services from '../../utils/services';

Page({
  onLoad(options) {
    this.setData({
      user_name: options.user_name
    });

    const user_url = `https://api.github.com/users/${this.data.user_name}`;
    this.showLoadingToast();
    this.fetchUserData(user_url);
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.user_name
    });
  },

  fetchUserData(url) {
    const self = this;
    let user;

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
        self.setData({ user: user });
        self.hideLoadingToast();
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