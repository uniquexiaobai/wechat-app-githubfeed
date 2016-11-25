export default {
  /*fetch(url) {
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
  }*/
  fetch(url, cb) {
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: (res) => {
        cb(null, res);
      },
      fail: (err) => {
        cb(err);
      }
    })
  }
};
