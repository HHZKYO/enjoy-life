// 导入 wechat-validate 模块
import wxValidate from 'wechat-validate'
// 获取应用实例
const app = getApp()

Page({
  behaviors: [wxValidate],
  data: {
    countDownVisible: false,
    mobile: '',
    code: ''
  },

  onLoad({redirectURL}) {
    // 获取地址参数
    this.redirectURL = redirectURL
  },

  rules: {
    mobile:[
      {required: true, message: '请填写手机号码!'},
      {pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!'}
    ],
    code: [
      {required: true, message: '请填写验证码!'},
      {pattern: /^\d{6}$/, message: '请填写正确的验证码!'}
    ]
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  // 获取短信验证码
  async getSMSCode() {
    // 获取验证结果
    const {valid, message} = this.validate('mobile')

    // 如果验证不合法则不再执行后面的逻辑
    if(!valid) return wx.utils.toast(message)
      
    // 显示倒计时组件
    this.setData({countDownVisible: true})

    // 调用接口获取验证码
    const {code, data} = await wx.http.get('/code', {mobile: this.data.mobile})

    // 检测验证码是否发送成功
    if(code !== 10000) return wx.utils.toast('发送失败，稍后重试!')
  },
  // 提交表单数据，完成登录&注册
  async submitForm() {
    // 验证数据是否合法
    if(!this.validate()) return

    // 调用登录接口
    const {code, data} = await wx.http.post('/login', {
      mobile: this.data.mobile,
      code: this.data.code
    })

    // 验证是否登录成功
    if(code !== 10000) return wx.utils.toast('登录失败，稍后重试!')

    // 记录登录状态
    app.setToken('token', data.token)
    app.setToken('refreshToken', data.refreshToken)

    // 重定向
    wx.redirectTo({url: this.redirectURL})
  }
})
