Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [{ name: '水路卫浴' }, { name: '电路灯具' }, { name: '管道疏通' }, { name: '开锁换锁' }],
    attachment: [
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
    ],
  },

  onLoad() {
    this.getHouseList();
  },

  // 获取房屋列表
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get("/house");
    if (code !== 10000) return wx.utils.toast();
    this.setData({ houseList });
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
