// 导入 wechat-validate 模块
import wxValidate from 'wechat-validate'

Page({
  behaviors: [wxValidate],
  data: {
    countDownVisible: false,
  },

  rules: {
    mobile:[
      {required: true, message: '请填写手机号码!'},
      {pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!'}
    ]
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  // 获取短信验证码
  getSMSCode() {
    // 获取验证结果
    const {valid, message} = this.validate('mobile')
    // 如果验证不合法则不再执行后面的逻辑
    if(!valid) return wx.utils.toast(message)
    // 显示倒计时组件
    this.setData({countDownVisible: true})
  }
})
