const app = getApp();
import { fetch } from '../../utils/services';
import languageList from '../../utils/language_list';

Page({
  data: {
    languageList: languageList,
    languageIndex: 0,
    tabList: ['Daily', 'Weekly', 'Monthly'],
    tabIndex: 0
  },

  onLoad() {
    this.refreshData();
  },

  onPullDownRefresh() {
    this.refreshData();
  },

   _reloadUrl() {
    // const basic_url = 'http://trending.codehub-app.com/v2/trending?since=';
    const basic_url = 'https://arguments.cn/api/trending?since=';

    // locationIndex may be 0 or '0'
    if (this.data.languageIndex == 0) {
      return basic_url + this.data.tabList[this.data.tabIndex].toLowerCase();
    }
    return `${basic_url}${this.data.tabList[this.data.tabIndex].toLowerCase()}&language=${this.data.languageList[this.data.languageIndex].toLowerCase()}`;
  },

  handleLanguagePickerChange(e) {
    this.setData({
      languageIndex: e.detail.value
    });
    this.fetchReposData(this._reloadUrl());
  },

  handleTabPickerChange(e) {
    this.setData({
      tabIndex: e.detail.value
    });
    this.fetchReposData(this._reloadUrl());
  },

  fetchReposData(url) {
    this.showLoadingToast();
    fetch(url).then(res => {
      if (res.statusCode === 200) {
        this.setData({ items: res.data });
      } else {
        console.log('# Request Error #', res);
      }
      this.hideLoadingToast();
    });
  },

  refreshData() {
    this.fetchReposData(this._reloadUrl());
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
