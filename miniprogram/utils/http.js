// 盗取 wechat-http 模块
import http from "wechat-http";

// 配置接口基础路径
http.baseURL = 'https://live-api.itheima.net'

// 配置请求拦截器
http.intercept.request = function (options) {
  // 扩展头信息
  const defaultHeader = {}
  // 身份认证
  defaultHeader.Authorization = 'Bearer ' + getApp().token
  // 与默认头信息合并
  options.header = Object.assign({}, defaultHeader, options.header)
  // 处理后的请求参数
  return options
}

// 配置响应拦截器
http.intercept.response = function ({data}) {
  // 如果状态码为401，则表明token已失效
  if (data.code === 401) {
    // 获取应用实例来读取 refreshToken
    const app = getApp()
    console.log(app.refreshToken)
  }
  // 只保留 data 数据
  return data
}

// 全局对象方式导出
wx.http = http