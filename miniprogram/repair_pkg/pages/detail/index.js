// map.js
Page({
  data: {
    repairDetail: {},
    latitude: 40.060539,
    longitude: 116.343847,
  },
  onLoad({ id }) {
    // 获取报修详情的数据
    this.getRepairDetail(id)
  },
  // 报修详情接口
  async getRepairDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    // 调用接口
    const { code, data: repairDetail } = await wx.http.get('/repair/' + id)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ repairDetail })
  }
})
