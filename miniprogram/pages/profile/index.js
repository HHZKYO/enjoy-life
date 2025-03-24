// pages/profile/index.ts

const pageStack = getCurrentPages()

Page({
  // 获取用户昵称
  getUserNickName(ev) {
    // console.log(ev)
    this.updateNickName(ev.detail.value)
  },
  async updateNickName(nickMame) {
    if(nickMame === '') return
    // 调用接口更新用户昵称
    const {code} = await wx.http.put('/userInfo',{nickMame})
    if(code !== 10000) return wx.utils.toast('更新昵称失败')

    // 借助页面栈实例更新数据
    pageStack[0].setData({nickMame})
  }
})