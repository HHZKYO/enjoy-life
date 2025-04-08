Page({
  data: {
    visitorList: [],
    isEmpty: false,
  },
  onLoad() {
    // 获取访客列表
    this.getVisitorList()
  },
  // 访客列表接口
  async getVisitorList(current = 1, pageSize = 5) {
    // 调用接口
    const {
      code,
      data: { rows: visitorList },
    } = await wx.http.get('/visitor', { current, pageSize })
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({
      isEmpty: visitorList.length === 0,
      visitorList,
    })
  },
  goPassport() {
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
