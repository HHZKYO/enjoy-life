Page({
  data: {
    currentDate: Date.now(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [],
    houseId: '',
    houseName: '',
    repairItemId: '',
    repairItemName: '',
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

  selectHouseInfo(ev) {
    this.setData({
      houseId: ev.detail.id,
      houseName: ev.detail.name,
    })
  },

  selectRepairItemInfo(ev) {
    this.setData({
      repairItemId: ev.detail.id,
      repairItemName: ev.detail.name,
    })
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

  selectDateInfo(ev) {
    this.setData({
      appointment: wx.utils.dataFormat(ev.detail),
      dateLayerVisible: false
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },

  uploadPicture(ev) {
    // 上传文件的信息
    const { file } = ev.detail
    // 调用 API 实现文件上传
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: file.url,
      name: 'file',
      header: {
        Authorization: 'Bearer ' + getApp().token,
      },
      success: (result) => {
        // 处理返回的 json 数据
        const data = JSON.parse(result.data)
        // 检测接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('文件上传失败!')
        // 先获取原来已经上传的图片
        const { attachment } = this.data
        // 追加新的上传的图片
        attachment.push(data.data)
        // 渲染数据
        this.setData({ attachment })
      },
    })
  },

  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
