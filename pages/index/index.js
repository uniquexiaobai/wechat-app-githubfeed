const app = getApp();
const services = require('../../utils/services.js');
const helper = require('../helper/index.js');

Page({
  data: {
    loading_hidden: true,
    items: [],
    page: 1
  },

  onLoad () {
    const user = wx.getStorageSync('user');
    console.log(user);
    if(!user) {
      wx.navigateTo({
        url: '../auth/onboard/onboard'
      });
    }
    this.refreshData();
  },

  _reloadUrl () {
    const basic_url = 'https://api.github.com/users/uniquexiaobai/received_events?page=';
    return basic_url + this.data.page;
  },

  _initData () {
    this.setData({
      items: [],
      page: 1
    });
  },

  fetchEventsData (url) {
    services.fetch(url).then(res => {
      console.log(res.data);
      res.data.forEach(item => {
        item.type = helper.formateActionType(item.type);
      });
      this.setData({
        items: this.data.items.concat(res.data),
        loading_hidden: true
      });
    });
  },

  loadMoreData () {
    this.setData({
      page: ++this.data.page,
      loading_hidden: false
    });
    this.fetchEventsData(this._reloadUrl());
  },

  refreshData () {
    this.setData({
      loading_hidden: false
    });
    this._initData();
    this.fetchEventsData(this._reloadUrl());
  }
});
