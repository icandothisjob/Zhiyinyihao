// pages/tiaozhi/tiaozhi.js
Page({
  data: {
    progressText: '为您分析推荐的饮品中',
    satisfaction: ''
  },
  

  onProgressEnd() {
    this.setData({
      progressText: '分析完毕'
    });
  }
});



