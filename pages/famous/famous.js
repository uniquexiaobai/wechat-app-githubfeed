
var app = getApp()
Page({
  data: {
    locationArray: ['Australia', 'China', 'Canada', 'France', 'Germany', 'India', 'Japan', 'UK', 'USA'],
    locationIndex: 0,
    languageArray: ['All Language', 'ActionScript', 'C', 'C#', 'C++', 'Clojure', 'CoffeeScript', 'CSS', 'Go', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lua', 'Matlab', 'Object-C', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Scala', 'Shell', 'Swift'],
    languageIndex: 0
  },
  bindLocationPickerChange: function(e) {
    this.setData({
      locationIndex: e.detail.value
    });
  },
  bindLanguagePickerChange: function(e) {
    this.setData({
      languageIndex: e.detail.value
    });
  }
});
