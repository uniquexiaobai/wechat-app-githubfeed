
const app = getApp();
const services = require('../../utils/services.js');

const basic_url = 'http://trending.codehub-app.com/v2/trending?since=';

Page({
  data: {
    languageArray: ['All Language', 'CSS', 'JavaScript', 'C', 'Java', 'PHP', 'Python', 'Ruby', 'Swift'],
    languageIndex: 0,
    tabArray: ['daily', 'weekly', 'monthly'],
    tabIndex: 0,
    loading_hidden: true
  },

  onLoad (options) {
    this.refreshData();
  },

  _reloadUrl () {
    const basic_url = 'http://trending.codehub-app.com/v2/trending?since=';
    if (this.data.languageIndex === 0) {
      return url = basic_url + this.data.tabArray[this.data.tabIndex];
    }
    return `${basic_url}${this.data.tabArray[this.data.tabIndex]}&language=${this.data.languageArray[this.data.languageIndex].toLowerCase()}`;
  },

  fetchReposData (url) {
    services.fetch(url).then(res => {
      if (res.data) {
        this.setData({
          items: res.data
        });
      }
      this.setData({
        loading_hidden: true
      });
    });
  },

  handleLanguagePickerChange (e) {
    this.setData({
      languageIndex: e.detail.value,
      loading_hidden: false
    });
    this.fetchReposData(this._reloadUrl());
  },

  handleTabPickerChange (e) {
    this.setData({
      tabIndex: e.detail.value,
      loading_hidden: false
    });
    this.fetchReposData(this._reloadUrl());
  },

  refreshData () {
    this.setData({
      loading_hidden: false
    });
    this.fetchReposData(this._reloadUrl());
  }
});
