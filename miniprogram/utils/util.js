const utils = {
  /**
   * 消息反馈（轻提示）
   * @param {string} title 文字提示内容
   */
  toast(title='数据加载失败...') {
    wx.showToast({
      title,
      mask: true,
      icon: 'none'
    })
  }
}

// 正常的模块导出
export default utils
// 也可以放在全局对象 utils 上
wx.utils = utils