const app = getApp();
import { debounce } from '../../../utils/util';
import { findUserByName } from '../../helpers/auth';

Page({
  data: {
    error_msg_hidden: true
  },

  onLoad() {
    this.setData({
      avatar_url: '/images/onboard/octocat.png'
    });
  },

  onShareAppMessage: function(){
    return {
      title: 'Github Feed',
      desc: '你的另一个 GitHub 客户端',
      path: '/pages/auth/onboard/onboard'
    };
  },

  handleOnboardSubmit(e) {
    const name = e.detail.value.username;

    findUserByName(name)
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) {
          const user = { username: name, avatar_url: res.data.avatar_url };

          wx.setStorageSync('user', user);
          wx.switchTab({
            url: '../../index/index',
          });
        } else {
          this.setData({
            avatar_url: '/images/onboard/octocat.png',
            error_msg_hidden: false
          });
        }
      });
  },

  handleInputChange: debounce(isUserExisted, 1000)
});

function isUserExisted(e) {
  const name = e.detail.value;

  findUserByName(name)
    .then((res) => {
      const currentPage = getCurrentPages()[getCurrentPages().length - 1];

      if (res.statusCode === 200) {
        currentPage.setData({
          avatar_url: res.data.avatar_url,
          error_msg_hidden: true
        });
      } else {
        currentPage.setData({
          avatar_url: '/images/onboard/octocat.png',
          error_msg_hidden: false
        });
      }
    });
};
