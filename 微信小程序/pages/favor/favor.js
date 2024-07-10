const mxDigital = require('../../utils/mxDigital.js');

Page({
  data: {
    sequence: [], // 追踪按钮按下的顺序
    requiredSequence: ['A', 'B', 'A', 'B', 'A', 'B'], // 需要的按钮按下顺序
    currentTemperature: "24.21", // 初始温度，确保是四位
    desiredTemperature: "", // 期望温度
    displayColor: '#FFA500', // 初始颜色
    statusText: '实时温度' // 初始状态文字
  },

  onLoad() {
    this.updateTemperature();
    this.drawTemperature(this.data.currentTemperature);
  },

  updateTemperature() {
    // 假设每隔5秒更新一次温度
    setInterval(() => {
      this.getTemperatureFromServer();
    }, 5000);
  },

  getTemperatureFromServer() {
    var that = this;
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': wx.getStorageSync('token') // 确保已经获取并存储了token
      },
      success: function(res) {
        const newTemp = res.data.shadow[1].reported.properties.temperature;
        that.setData({
          currentTemperature: that.formatTemperature(newTemp)
        });
        that.drawTemperature(that.data.currentTemperature);
      },
      fail: function() {
        console.error("获取温度数据失败");
      }
    });
  },

  adjustTemperature() {
    const currentTemp = parseFloat(this.data.currentTemperature);
    const desiredTemp = parseFloat(this.data.desiredTemperature);

    let newTemp = currentTemp;

    if (desiredTemp > currentTemp) {
      newTemp = (currentTemp + 0.1).toFixed(2);
      this.setData({
        statusText: '正在升温'
      });
    } else if (desiredTemp < currentTemp) {
      newTemp = (currentTemp - 0.1 + (Math.random() * 0.2 - 0.1)).toFixed(2);
      this.setData({
        statusText: '正在降温'
      });
    } else {
      this.setData({
        statusText: '实时温度'
      });
    }

    newTemp = this.formatTemperature(newTemp);
    this.setData({
      currentTemperature: newTemp
    });
    this.drawTemperature(newTemp);
  },

  formatTemperature(value) {
    // 确保温度显示为四位数
    let formattedValue = value.toString();
    if (formattedValue.length < 5) {
      formattedValue = "0" + formattedValue;
    }
    return formattedValue;
  },

  drawTemperature(value) {
    const res = {
      canvasid: 'tempCanvas',
      value: value,
      width: 350, // 画布宽度，确保足够宽以水平居中显示四位数
      height: 100, // 画布高度
      size: 40, // 字体大小
      color: this.data.displayColor // 字体颜色
    };
    const digitalDisplay = new mxDigital(res);
  },

  onDesiredTempInput(e) {
    this.setData({
      desiredTemperature: e.detail.value
    });
  },

  onConfirmTap() {
    const desiredTemp = parseFloat(this.data.desiredTemperature);
    const currentTemp = parseFloat(this.data.currentTemperature);

    if (desiredTemp > currentTemp) {
      this.setData({
        displayColor: '#FF6347', // 番茄红
      });
    } else if (desiredTemp < currentTemp) {
      this.setData({
        displayColor: '#0000CD', // 冰蓝色
      });
    } else {
      this.setData({
        displayColor: '#FFA500', // 初始颜色
      });
    }

    this.drawTemperature(this.data.currentTemperature);
    this.submitDesiredTemperature(desiredTemp);
  },

  submitDesiredTemperature(desiredTemp) {
    wx.request({
      url: 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/66892c0fc2e5fa1b15905bac/devices/66892c0fc2e5fa1b15905bac_0000/commands',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': wx.getStorageSync('token') // 确保已经获取并存储了token
      },
      data: {
        service_id: "Temperature",
        command_name: "change",
        paras: {
          changetem: desiredTemp
        }
      },
      success: function(res) {
        console.log("提交期望温度成功", res);
      },
      fail: function() {
        console.error("提交期望温度失败");
      }
    });
  },

  onBeginTap() {
    // 按钮点击事件
    console.log('Begin button tapped');
    wx.navigateTo({
      url: '/pages/new/new' // 替换为实际的新页面路径
    });
  },

  onButtonATap() {
    this.addToSequence('A');
  },

  onButtonBTap() {
    this.addToSequence('B');
  },

  addToSequence(button) {
    const { sequence, requiredSequence } = this.data;
    sequence.push(button);

    // 只保留最近的按键记录
    if (sequence.length > requiredSequence.length) {
      sequence.shift();
    }

    this.setData({ sequence });

    // 检查按键顺序是否正确
    if (sequence.join('') === requiredSequence.join('')) {
      console.log('进入开发者调试页面');
      wx.navigateTo({
        url: '/pages/admin/admin' 
      });
    }
  }
});
