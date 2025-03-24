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
  },
  setToken(key, token) {
    // 将 token 记录在应用实例中   
    this[key] = token
    // 将 token 存入本地
    wx.setStorageSync(key, token)
 }
})
