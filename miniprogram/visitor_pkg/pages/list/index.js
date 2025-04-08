import { throttle } from 'miniprogram-licia'

Page({
  data: {
    visitorList: [],
    isEmpty: false,
  },
  onLoad() {
    // 获取访客列表
    this.getVisitorList()
    this.getMoreVisitor = throttle(() => {
      if (!this.data.hasMore) return
      this.getVisitorList(++this._current)
    }, 100)
  },
  // 访客列表接口
  async getVisitorList(current = 1, pageSize = 5) {
    // 调用接口
    const {
      code,
      data: { pageTotal, rows: visitorList },
    } = await wx.http.get('/visitor', { current, pageSize })
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({
      hasMore: current < pageTotal,
      isEmpty: visitorList.length === 0,
      visitorList: this.data.visitorList.concat(visitorList),
    })
    // 记录下来当前的页面
    this._current = current
  },
  goPassport() {
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
