// pages/Huawei_iot.js
Page({
  data: {
    result: '等待获取token',
  },
  touchBtn_gettoken: function() {
    console.log("获取token按钮按下");
    this.gettoken();
  },
  touchBtn_getshadow: function() {
    console.log("获取设备影子按钮按下");
    this.getshadow();
  },
  touchBtn_setCommand: function() {
    console.log("舵机命令下发按钮按下");
    this.setCommand();
  },
  touchBtn_setCommandA: function() {
    console.log("A酒品调制命令下发");
    this.setCommandA();
  },
  touchBtn_setCommandB: function() {
    console.log("B酒品调制命令下发");
    this.setCommandB();
  },
  touchBtn_setCommandC: function() {
    console.log("C酒品调制命令下发");
    this.setCommandC();
  },
  gettoken: function() {
    console.log("开始获取。。。");
    var that = this;
    wx.request({
      url: 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
      data: '{"auth": { "identity": {"methods": ["password"],"password": {"user": {"name": "xdtz","password": "xudd139310","domain": {"name": "hid_w91m83ubrqweik-"}}}},"scope": {"project": {"name": "cn-north-4"}}}}',
      method: 'POST',
      header: {'content-type': 'application/json' },
      success: function(res) {
        console.log("获取token成功");
        var token = JSON.stringify(res.header['X-Subject-Token']).replaceAll("\"", "");
        console.log("获取token=\n" + token);
        wx.setStorageSync('token', token);
      },
      fail: function() {
        console.log("获取token失败");
      },
      complete: function() {
        console.log("获取token完成");
        that.setData({ result: "获取token完成" });
      }
    });
  },
  getshadow: function() {
    console.log("开始获取影子");
    var that = this;
    var token = wx.getStorageSync('token');
    console.log("我的toekn:" + token);
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/shadow',
      method: 'GET',
      header: {'content-type': 'application/json', 'X-Auth-Token': token },
      success: function(res) {
        console.log(res);
        var shadow = JSON.stringify(res.data.shadow[0].reported.properties);
        console.log('设备影子数据：' + shadow);
        var ServoControl = JSON.stringify(res.data.shadow[1].reported.properties.ServoControl);
        var Working_state = JSON.stringify(res.data.shadow[1].reported.properties.Working_state);
        console.log('舵机状态' + ServoControl);
        console.log('工作状态' + Working_state);
        that.setData({ result: '舵机状态' + ServoControl + '工作状态' + Working_state });
      },
      fail: function() {
        console.log("获取影子失败");
      },
      complete: function() {
        console.log("获取影子完成");
      }
    });
  },
  setCommand: function() {
    console.log("开始下发命令。。。");
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "turn","command_name": "ServoControl","paras": { "turn": "ROUND_SLOW"}}',
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
        that.setData({ result: '设备命令下发完成' });
      }
    });
  },
  setCommandA: function() {
    console.log("开始下发命令。。。");
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "demo","command_name": "Control","paras": { "TrafficModule": "YELLOW_LED_ON"}}',
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
        that.setData({ result: '设备命令下发完成' });
      }
    });
  },
  setCommandB: function() {
    console.log("开始下发命令。。。");
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "demo","command_name": "Control","paras": { "TrafficModule": "YELLOW_LED_ON"}}',
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
        that.setData({ result: '设备命令下发完成' });
      }
    });
  },
  setCommandC: function() {
    console.log("开始下发命令。。。");
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      data: '{"service_id": "demo","command_name": "Control","paras": { "TrafficModule": "YELLOW_LED_ON"}}',
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
        that.setData({ result: '设备命令下发完成' });
      }
    });
  }
});

module.exports = {
  touchBtn_gettoken: Page.touchBtn_gettoken,
  touchBtn_getshadow: Page.touchBtn_getshadow,
  touchBtn_setCommand: Page.touchBtn_setCommand,
  touchBtn_setCommandA: Page.touchBtn_setCommandA,
  touchBtn_setCommandB: Page.touchBtn_setCommandB,
  touchBtn_setCommandC: Page.touchBtn_setCommandC,
};
