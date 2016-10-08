
const app = getApp();
const services = require('../../utils/services.js');

const basic_url = 'http://trending.codehub-app.com/v2/trending?since=';

Page({
  data: {
    languageArray: ['All Language', 'HTML', 'CSS', 'JavaScript', 'C', 'Java', 'PHP', 'Python', 'Ruby', 'Swift'],
    languageIndex: 0,
    tabArray: ['daily', 'weekly', 'monthly'],
    tabIndex: 0,
    loading_hidden: true
  },

  onLoad(options) {
    this.setData({
      loading_hidden: false
    });
    const url = basic_url + this.data.tabArray[this.data.tabIndex];
    this.fetchReposData(url);
  },

  fetchReposData(url) {
    services.fetch(url).then(res => {
      this.setData({
        items: res.data,
        loading_hidden: true
      });
    });
  },

  handleLanguagePickerChange(e) {
    this.setData({
      languageIndex: e.detail.value,
      loading_hidden: false
    });
    let url = '';
    if (this.data.languageIndex === 0) {
      url = basic_url + this.data.tabArray[this.data.tabIndex];
    } else {
      url = `${basic_url}${this.data.tabArray[this.data.tabIndex]}&language=${this.data.languageArray[this.data.languageIndex].toLowerCase()}`;
    }
    this.fetchReposData(url);
  },

  handleTabPickerChange(e) {
    this.setData({
      tabIndex: e.detail.value,
      loading_hidden: false
    });
    const url = basic_url + this.data.tabArray[this.data.tabIndex];
    this.fetchReposData(url);
  }
});
