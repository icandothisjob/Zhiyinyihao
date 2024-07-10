// pages/shoudong/shoudong.js
Page({
  data: {
    selectedEmotion: '', // 保存用户选择的情绪
    showRecommendation: false, // 控制是否显示推荐信息
    recommendation: '' // 推荐信息
  },

  // 处理情绪选择变化
  onEmotionChange(e) {
    this.setData({
      selectedEmotion: e.detail.value
    });
  },

  // 处理点击确定按钮事件
  onConfirm() {
    let recommendation = '';
    switch (this.data.selectedEmotion) {
      case '开心':
        recommendation = '为您推荐马提尼';
        break;
      case '愤怒':
        recommendation = '为您推荐玛格丽塔';
        break;
      case '悲伤':
        recommendation = '为您推荐朗姆';
        break;
      default:
        recommendation = '';
        break;
    }

    this.setData({
      showRecommendation: true,
      recommendation: recommendation
    });
  }
});
