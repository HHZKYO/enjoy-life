Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [],
    attachment: [
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
    ],
  },

  onLoad() {
    this.getHouseList();
    this.getRepairItem();
  },

  // 获取房屋列表
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house');
    if (code !== 10000) return wx.utils.toast();
    this.setData({ houseList });
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },

  // 获取维修项目
  async getRepairItem() {
    const { code, data: repairItem } = await wx.http.get('/repairItem');
    if (code !== 10000) return wx.utils.toast();
    this.setData({ repairItem });
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
