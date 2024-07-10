// pages/tiaozhi/tiaozhi.js
Page({
  data: {
    progressText: '为您调酒中',  // 初始化进度文本
    satisfaction: ''  // 初始化满意度响应
  },

  onProgressEnd() {
    // 当进度结束时，更新文本表明调酒完成
    this.setData({
      progressText: '调酒完毕'
    });
  },

  onSatisfactionChange(e) {
    // 获取checkbox-group中选中项的数组
    const values = e.detail.value;
    // 检查用户的满意度反馈
    let satisfaction = '';
    if (values.includes('satisfied')) {
      satisfaction = 'satisfied';  // 用户满意
    } else if (values.includes('unsatisfied')) {
      satisfaction = 'unsatisfied';  // 用户不满意
    }
    // 更新页面数据
    this.setData({
      satisfaction: satisfaction
    });
  },

  onIssueChange(e) {
    // 获取checkbox-group中选中项的数组
    const issues = e.detail.value;
    // 更新页面数据（你可以在这里处理用户选择的具体问题）
    console.log('用户反馈的问题：', issues);
  }
});
