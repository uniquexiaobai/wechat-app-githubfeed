
var app = getApp()
Page({
  data: {
    languageArray: ['All Language', 'C', 'CSS', 'Go', 'HTML', 'Java', 'JavaScript', 'Lua', 'Object-C', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Scala', 'Shell', 'Swift'],
    languageIndex: 0,
    tabArray: ['daily', 'weekly', 'monthly'],
    tabIndex: 0
  },
  bindLanguagePickerChange: function(e) {
    this.setData({
      languageIndex: e.detail.value
    });
  },
  bindTabPickerChange: function(e) {
    this.setData({
      tabIndex: e.detail.value
    });
  }
});
