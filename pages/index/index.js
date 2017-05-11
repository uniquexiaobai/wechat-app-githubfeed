const app = getApp();
import { fetch } from '../../utils/services';
import { timesAgo } from '../../utils/util'
import { formateActionType } from '../helpers/index';

Page({
  data: {
    items: [],
    page: 1
  },

  onLoad() {
    const user = wx.getStorageSync('user');

    console.log('#user#', user);
    if (!user) {
      wx.redirectTo({
        url: '../auth/onboard/onboard'
      });
    } else {
      this.refreshData();
    }
  },

  onPullDownRefresh() {
    this.refreshData();
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/users/uniquexiaobai/received_events?page=';

    return basic_url + this.data.page;
  },

  _initData() {
    this.setData({
      items: [],
      page: 1
    });
  },

  fetchEventsData(url) {
    fetch(url).then(res => {
      if (res.statusCode === 200) {
          res.data.forEach(item => {
          item.type = formateActionType(item.type);
          item.created_at = timesAgo(item.created_at);
        });
        this.setData({
          items: this.data.items.concat(res.data)
        });
      } else {
        console.log('# Request Error #', res);
      }
      this.hideLoadingToast();
    });
  },

  loadMoreData() {
    this.showLoadingToast();
    this.setData({
      page: ++this.data.page
    });
    this.fetchEventsData(this._reloadUrl());
  },

  refreshData() {
    this.showLoadingToast();
    this._initData();
    this.fetchEventsData(this._reloadUrl());
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
