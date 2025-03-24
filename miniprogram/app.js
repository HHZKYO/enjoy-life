// app.js

import './utils/util'
import './utils/http'

App({
  globalData: {},
  onLaunch() {
    // 读取 token
    this.getToken()
  },
  getToken() {
    // 读取本地的 token
    this.token = wx.getStorageSync('token')
  }
})
