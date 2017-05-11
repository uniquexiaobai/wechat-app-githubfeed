const app = getApp();
import { fetch } from '../../utils/services';
import languageList from '../../utils/language_list';
import countryList from '../../utils/country_list';

Page({
  data: {
    locationList: countryList,
    locationIndex: 2,
    languageList: languageList,
    languageIndex: 12,
    items: [],
    page: 1,
    incomplete_results: false
  },

  onLoad() {
    this.refreshData();
  },

  onPullDownRefresh() {
    this.refreshData();
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/search/users?q=';

    // locationIndex may be 0 or '0'
    if (this.data.locationIndex == 0) {
      return `${basic_url}language:${this.data.languageList[this.data.languageIndex]}&sort=followers&page=${this.data.page}`;
    }
    if (this.data.languageIndex == 0) {
      return `${basic_url}location:${this.data.locationList[this.data.locationIndex]}&sort=followers&page=${this.data.page}`;
    }
    return `${basic_url}location:${this.data.locationList[this.data.locationIndex]}+language:${this.data.languageList[this.data.languageIndex]}&sort=followers&page=${this.data.page}`;
  },

  _initData() {
    this.setData({
      items: [],
      page: 1,
      incomplete_results: false
    });
  },

  fetchUsersData(url) {
    this.showLoadingToast();
    fetch(url).then(res => {
      if (res.statusCode === 200) {
        this.setData({
          items: this.data.items.concat(res.data.items),
          page: 1,
          incomplete_results: res.data.incomplete_results
        });
      } else {
        console.log('# Request Error #', res);
      }
      this.hideLoadingToast();
    });
  },

  handleLocationPickerChange(e) {
    if (this.data.languageIndex || e.detail.value) {
      this.setData({
        locationIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },

  handleLanguagePickerChange(e) {
    if (this.data.locationIndex || e.detail.value) {
      this.setData({
        languageIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },

  loadMoreData() {
    if (this.data.incomplete_results) return;
    this.setData({
      page: ++this.data.page
    });
    this.fetchUsersData(this._reloadUrl());
  },

  refreshData() {
    this._initData();
    this.fetchUsersData(this._reloadUrl());
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
