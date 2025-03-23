// 导入封装好的工具方法库
// import utils from "../../utils/util"

Page({
  onLoad() {
    // 模块方式调用
    // utils.toast('页面加载完成')

    // 全局对象调用
    wx.utils.toast('页面加载完成')
  }
})
