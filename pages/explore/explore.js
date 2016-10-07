
var app = getApp()
Page({
  data: {
    languageArray: ['All Language', 'HTML', 'CSS', 'JavaScript', 'C', 'Java', 'PHP', 'Python', 'Ruby', 'Swift'],
    languageIndex: 0,
    tabArray: ['daily', 'weekly', 'monthly'],
    tabIndex: 0,
    loading_hidden: true
  },

  onLoad: function(options) {
    var basic_url = 'http://trending.codehub-app.com/v2/trending?since=daily';

    this.setData({
      loading_hidden: false
    });

    this.fetchApi(basic_url).then(res => {
      this.setData({
        itmes: res.data,
        loading_hidden: true
      });
    });
  },

  fetchApi: function(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        data: {},
        header: {
          'Accept': 'application/json'
        },
        success: resolve,
        fail: reject
      });
    });
  },

  bindLanguagePickerChange: function(e) {
    this.setData({
      languageIndex: e.detail.value,
      loading_hidden: false
    });
    var basic_url = 'http://trending.codehub-app.com/v2/trending?since=';
    var url = '';
    if (this.data.languageIndex === 0) {
      url = basic_url + this.data.tabArray[this.data.tabIndex];
    } else {
      url = basic_url + this.data.tabArray[this.data.tabIndex] + '&language=' + this.data.languageArray[this.data.languageIndex].toLowerCase();
    }
    this.fetchApi(url).then(res => {
      this.setData({
        itmes: res.data,
        loading_hidden: true
      });
    });
  },

  bindTabPickerChange: function(e) {
    this.setData({
      tabIndex: e.detail.value,
      loading_hidden: false
    });
    var basic_url = 'http://trending.codehub-app.com/v2/trending?since=';
    var url = basic_url + this.data.tabArray[this.data.tabIndex];
    this.fetchApi(url).then(res => {
      this.setData({
        itmes: res.data,
        loading_hidden: true
      });
    });
  }
});
