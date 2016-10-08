
var app = getApp();
var services = require('../../utils/services.js');

Page({
  data: {
    locationArray: ['World', 'Australia', 'China', 'Japan', 'USA'],
    locationIndex: 0,
    languageArray: ['All Language', 'C', 'CSS', 'Java', 'JavaScript', 'PHP', 'Python', 'Swift'],
    languageIndex: 0,
    loading_hidden: true
  },

  onLoad: function(options) {
    var basic_url = 'https://api.github.com/search/users?q=location:China+language:ActionScript&sort=followers&page=1';

    this.setData({
      loading_hidden: false
    });

    services.fetchApi(basic_url).then(res => {
      console.log(res.data);
      this.setData({
        items: res.data.items,
        loading_hidden: true
      });
    });
  },

  bindLocationPickerChange: function(e) {
    this.setData({
      locationIndex: e.detail.value,
      loading_hidden: false
    });
    var basic_url = 'https://api.github.com/search/users?q=';
    var url = '';
    if (this.data.locationIndex === 0) {
      url = basic_url + 'language:' + this.data.languageArray[this.data.languageIndex] + '&sort=followers&page=1';
    } else {
      url = basic_url + 'location:' + this.data.locationArray[this.data.locationIndex] + '+language:' + this.data.languageArray[this.data.languageIndex] + '&sort=followers&page=1';
    }
    console.log(url);
    services.fetchApi(url).then(res => {
      this.setData({
        items: res.data.items,
        loading_hidden: true
      });
    });
  },

  bindLanguagePickerChange: function(e) {
    this.setData({
      languageIndex: e.detail.value,
      loading_hidden: false
    });
    var basic_url = 'https://api.github.com/search/users?q=';
    var url = basic_url + 'location:' + this.data.locationArray[this.data.locationIndex] + '+language:' + this.data.languageArray[this.data.languageIndex] + '&sort=followers&page=1';
    services.fetchApi(url).then(res => {
      this.setData({
        items: res.data.items,
        loading_hidden: true
      });
    });
  },

  loadMore: function() {
    console.log('loadMore');
  }
});
