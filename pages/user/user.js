import services from '../../utils/services';

Page({
  data: {
    
  },

  onLoad(options) {
    this.showLoadingToast();
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

  onPullDownRefresh() {
    // console.log('#onPullDownRefresh#');
  },

  fetchUserData(url) {
    services.fetch(url, (err, res) => {
      if (res.data) {
        const user = res.data;
        const self = this;
        services.fetch(user.organizations_url, (err, res) => {
          if (res.data) {
            user.orgs = res.data;
            self.setData({
              user: user
            });
            self.hideLoadingToast();
          }
        });
      }
    });
  },

  showLoadingToast() {
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading', 
      duration: 10000
    });
  },

  hideLoadingToast() {
    wx.hideToast();
  }
});