import services from '../../utils/services';

Page({
  data: {
    items: [],
    page: 1
  },

  onLoad(options) {
    this.setData({
      user_name: options.login
    });

    this.fetchFollowersData(this._reloadUrl());
  },

  _reloadUrl() {
    return `https://api.github.com/users/${this.data.user_name}/followers?page=${this.data.page}`;
  },

  fetchFollowersData(url) {
    this.showLoadingToast();
    services.fetch(url).then(res => {
      if (res.data) {
        this.setData({
          items: this.data.items.concat(res.data),
        });
        this.hideLoadingToast();
      }
    });
  },

  loadMoreData() {
    this.setData({
      page: ++this.data.page
    });
    this.fetchFollowersData(this._reloadUrl());
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