
const app = getApp();
const services = require('../../utils/services.js');

Page({
  data: {
    locationArray: ['All Country', 'China', 'USA', 'Japan', 'Australia'],
    locationIndex: 1,
    languageArray: ['All Language', 'CSS', 'Java', 'JavaScript', 'PHP', 'Python', 'Swift', 'C'],
    languageIndex: 0,
    loading_hidden: true,
    items: [],
    page: 1,
    incomplete_results: false
  },

  onLoad () {
    this.refreshData();
  },

  _reloadUrl () {
    const basic_url = 'https://api.github.com/search/users?q=';
    if (!this.data.locationIndex) {
      return `${basic_url}language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=${this.data.page}`;
    }
    if (!this.data.languageIndex) {
      return `${basic_url}location:${this.data.locationArray[this.data.locationIndex]}&sort=followers&page=${this.data.page}`;
    }
    return `${basic_url}location:${this.data.locationArray[this.data.locationIndex]}+language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=${this.data.page}`;
  },

  _initData () {
    this.setData({
      items: [],
      page: 1,
      incomplete_results: false
    });
  },

  fetchUsersData (url) {
    services.fetch(url).then(res => {
      if (res.data.items) {
        this.setData({
          items: this.data.items.concat(res.data.items),
          page: 1,
          incomplete_results: res.data.incomplete_results
        });
      }
      this.setData({
        loading_hidden: true
      });
    });
  },

  handleLocationPickerChange (e) {
    if (this.data.languageIndex || e.detail.value) {
      this.setData({
        locationIndex: e.detail.value,
        loading_hidden: false
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },

  handleLanguagePickerChange (e) {
    if (this.data.locationIndex || e.detail.value) {
      this.setData({
        languageIndex: e.detail.value,
        loading_hidden: false
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },

  loadMoreData () {
    if (this.data.incomplete_results) return;
    this.setData({
      loading_hidden: false,
      page: ++this.data.page
    });
    this.fetchUsersData(this._reloadUrl());
  },

  refreshData () {
    this.setData({
      loading_hidden: false
    });
    this._initData();
    this.fetchUsersData(this._reloadUrl());
  }
});
