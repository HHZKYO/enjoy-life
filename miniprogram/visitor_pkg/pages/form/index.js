Page({
  data: {
    name: '',
    gender: 1,
    mobile: '',
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseList: []
  },
  onLoad() {
    // 获取房屋列表
    this.getHouseList()
  },
  // 获取房屋列表
  async getHouseList() {
    // 调用接口
    const { code, data: houseList } = await wx.http.get('/house')
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ houseList })
  },
  // 获取用户选择的房屋
  // 这是本次该提交的
  selectHouseInfo(ev) {
    // 记录获取的数据
    this.setData({
      houseId: ev.detail.id,
      houseInfo: ev.detail.name,
    })
  },

  // 获取用户选择的日期
  selectDateInfo(ev) {
    // 记录获取的时间并隐藏弹层
    this.setData({
      visitDate: wx.utils.dataFormat(ev.detail),
      dateLayerVisible: false,
    })
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goPassport() {
    wx.reLaunch({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
