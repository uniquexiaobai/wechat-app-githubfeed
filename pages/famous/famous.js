
const app = getApp();
const services = require('../../utils/services.js');

const basic_url = 'https://api.github.com/search/users?q=';

Page({
  data: {
    locationArray: ['World', 'Australia', 'China', 'Japan', 'USA'],
    locationIndex: 0,
    languageArray: ['All Language', 'C', 'CSS', 'Java', 'JavaScript', 'PHP', 'Python', 'Swift'],
    languageIndex: 0,
    loading_hidden: true
  },

  onLoad(options) {
    this.setData({
      loading_hidden: false
    });

    const url = `${basic_url}language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=1`;
    this.fetchUsersData(url);
  },

  fetchUsersData(url) {
    services.fetch(url).then(res => {
      this.setData({
        items: res.data.items,
        loading_hidden: true
      });
    });
  },

  handleLocationPickerChange(e) {
    this.setData({
      locationIndex: e.detail.value,
      loading_hidden: false
    });
    let url = '';
    if (this.data.locationIndex === 0) {
      url = `${basic_url}language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=1`;
    } else {
      url = `${basic_url}location:${this.data.locationArray[this.data.locationIndex]}+language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=1`;
    }
    this.fetchUsersData(url);
  },

  handleLanguagePickerChange(e) {
    this.setData({
      languageIndex: e.detail.value,
      loading_hidden: false
    });
    const url = `${basic_url}location:${this.data.locationArray[this.data.locationIndex]}+language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=1`;
    this.fetchUsersData(url);
  },

  loadMore() {
    console.log('loadMore');
  }
});
