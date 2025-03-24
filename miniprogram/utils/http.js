// 盗取 wechat-http 模块
import http from "wechat-http";

// 配置接口基础路径
http.baseURL = 'https://live-api.itheima.net'

// 配置响应拦截器
http.intercept.response = function ({data}) {
  // 只保留 data 数据
  return data
}

// 全局对象方式导出
wx.http = http