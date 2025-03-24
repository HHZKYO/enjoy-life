// 导入封装好的工具方法库
// import utils from "../../utils/util"

Page({
  async onLoad() {
    // 模块方式调用
    // utils.toast('页面加载完成')

    // 全局对象调用
    // wx.utils.toast('页面加载完成')

    // 请求接口数据（全局方式调用）
    const res = await wx.http.get('/announcement')
    console.log(res)
  }
})
