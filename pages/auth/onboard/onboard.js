const app = getApp();
import util from '../../../utils/util';
import helpers from '../../helpers/auth';

Page({
  data: {
    avatar_url: '',
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

    helpers.findUserByName(name, result => {
      if (result) {
        const user = { username: name, avatar_url: result };

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

  handleInputChange: util.debounce(isUserExisted, 1000)
});

function isUserExisted(e) {
  const name = e.detail.value;

  helpers.findUserByName(name, result => {
    const currentPage = getCurrentPages()[getCurrentPages().length - 1];

    if (result) {
      currentPage.setData({
        avatar_url: result,
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
