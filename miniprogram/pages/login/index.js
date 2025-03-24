Page({
  data: {
    countDownVisible: false,
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  // 获取短信验证码
  getSMSCode() {
    this.setData({countDownVisible: true})
  }
})
