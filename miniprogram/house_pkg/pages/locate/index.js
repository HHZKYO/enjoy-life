// house_pkg/pages/locate/index.ts
Page({
  onLoad() {
    this.getLocation()
  },
  // 获取用户位置
  async getLocation() {
    // 调用 API
    const {latitude, longitude} = await wx.getLocation()
    console.log(latitude, longitude)
  }
})