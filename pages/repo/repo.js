import services from '../../utils/services';

Page({
  data: {
    loading_hidden: true
  },

  onLoad(options) {
    this.setData({
      repo_full_name: options.repo_full_name,
      loading_hidden: false
    });
    this.fetchRepoData(this._reloadUrl());
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/repos/';

    return basic_url + this.data.repo_full_name;
  },

  fetchRepoData(url) {
    services.fetch(url).then(res => {
      this.setData({
        repo: res.data,
        loading_hidden: true
      });
    });
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.repo_full_name
    });
  }
});
