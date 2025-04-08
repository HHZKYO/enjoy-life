Page({
  data: {
    passport: {}
  },
  onLoad({ id }) {
    // 获取访客详情
    this.getPassport(id)
  },
  // 获取访客详情（通行证）
  async getPassport(id) {
    // 检测是否存在 id
    if (!id) return
    // 调用接口
    const { code, data: passport } = await wx.http.get('/visitor/' + id)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ passport })
  },
  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
})
