Page({
  onBeginTap(e) {
    // 获取按钮类型
    const btnType = e.currentTarget.dataset.type;
    
    // 根据按钮类型跳转到对应页面
    if(btnType === 'shoudong') {
      console.log('手动按钮被点击');
      wx.navigateTo({
        url: '/pages/shoudong/shoudong'
      });
    } else if(btnType === 'zidong') {
      console.log('自动按钮被点击');
      wx.navigateTo({
        url: '/pages/zidong/zidong'
      });
    }
  }
});


Component({
  methods: {
    moodChange: function (e) {
      let mood = e.detail.value;
      console.log('Selected mood:', mood);
      // 进行相应的逻辑处理
    }
  }
})