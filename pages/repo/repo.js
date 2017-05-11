import { fetch } from '../../utils/services';

Page({
  onLoad(options) {
    this.setData({
      repo_full_name: options.repo_full_name
    });
    
    this.fetchRepoData(this._reloadUrl());
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.repo_full_name
    });
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/repos/';

    return basic_url + this.data.repo_full_name;
  },

  fetchRepoData(url) {
    this.showLoadingToast();
    fetch(url).then(res => {
      if (res.statusCode === 200) {
        this.setData({ repo: res.data });
      } else {
        console.log('# Request Error #', res);
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
