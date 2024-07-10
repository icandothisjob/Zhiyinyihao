// pages/index/index.js
const app = getApp();

Page({
  data: {
    test: [
      {
        img: '/image/drink1.png',
        title: '干马天尼',
        type: '酒品类型',
        look: '309浏览',
        say : '14评论'
      },
      {
        img : '/image/drink2.png',
        title : '玛格丽特',
        type : '酒品类型',
        look : '299浏览',
        say : '14评论'
      },
      {
        img : '/image/drink3.png',
        title : '金汤力',
        type : '酒品类型',
        look : '666浏览',
        say : '5评论'
      },
      {
        img: '/image/icon/drink4.png',
        title: '迈泰',
        type: '酒品类型',
        look: '506浏览',
        say: '3评论'
      },
      {
        img: '/image/icon/longshe.jpg',
        title: '龙舌兰酒',
        type: '酒品类型',
        look: '450浏览',
        say: '20评论'
      },
      {
        img: '/image/icon/dusongzi.jpg',
        title: '杜松子酒',
        type: '酒品类型',
        look: '122浏览',
        say: '63评论'
      }
    ]
  },

  onLoad: function () {
  },

  // 定义调制命令函数
  touchBtn_setCommandA: function() {
    console.log("A酒品调制命令下发");
    // 在这里添加你的逻辑实现
    var token = wx.getStorageSync('token'); // 这里假设token已经获取并存储在缓存中
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "wire_maker","command_name": "ServoControl","paras": { "Servo": "ROUND_TURN"}}',
      method: 'POST',
      header: {'content-type': 'application/json', 'X-Auth-Token': token },
      success: function(res) {
        console.log("下发命令成功");
        console.log(res);
      },
      fail: function() {
        console.log("命令下发失败");
        console.log("请先获取token");
      },
      complete: function() {
        console.log("命令下发完成");
      }
    });
  },

  touchBtn_setCommandB: function() {
    console.log("B酒品调制命令下发");
    // 在这里添加你的逻辑实现
    var token = wx.getStorageSync('token'); // 这里假设token已经获取并存储在缓存中
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "wire_maker","command_name": "ServoControl","paras": { "Servo": "ROUND_TURN"}}',
      method: 'POST',
      header: {'content-type': 'application/json', 'X-Auth-Token': token },
      success: function(res) {
        console.log("下发命令成功");
        console.log(res);
      },
      fail: function() {
        console.log("命令下发失败");
        console.log("请先获取token");
      },
      complete: function() {
        console.log("命令下发完成");
      }
    });
  },

  touchBtn_setCommandC: function() {
    console.log("C酒品调制命令下发");
    // 在这里添加你的逻辑实现
    var token = wx.getStorageSync('token'); // 这里假设token已经获取并存储在缓存中
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "wire_maker","command_name": "ServoControl","paras": { "Servo": "ROUND_TURN"}}',
      method: 'POST',
      header: {'content-type': 'application/json', 'X-Auth-Token': token },
      success: function(res) {
        console.log("下发命令成功");
        console.log(res);
      },
      fail: function() {
        console.log("命令下发失败");
        console.log("请先获取token");
      },
      complete: function() {
        console.log("命令下发完成");
      }
    });
  },

  onButtonTap: function(event) {
    const index = event.currentTarget.dataset.index;
    console.log(`Button ${index} clicked`);

    // 根据选择的按钮下发对应命令
    switch(index) {
      case 0:
        this.touchBtn_setCommandA(); // 对应A酒品调制命令
        break;
      case 1:
        this.touchBtn_setCommandB(); // 对应B酒品调制命令
        break;
      case 2:
        this.touchBtn_setCommandC(); // 对应C酒品调制命令
        break;
      default:
        console.log('未知命令');
    }

    // 跳转到新的页面
    wx.navigateTo({
      url: '/pages/xuanhao/xuanhao'
    });
  }
});
