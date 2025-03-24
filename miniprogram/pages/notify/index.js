// pages/notify/index.ts
Page({
  data: {
    noticeDetail: {}
  },
  onLoad({id}) {
    // 获取公告详情数据
    this.getNoticeDetail(id)
  },
  // 调用公告详情接口
  async getNoticeDetail(id) {
    // 检测 id 是否存在
    if(typeof id === "undefined") return
    // 调用接口
    const {code, data: noticeDetail} = await wx.http.get('/announcement/' + id)
    // 验证接口调用是否成功
    if(code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({noticeDetail})
  }
})