// pages/profile/index.ts

// 获取页面栈实例
const pageStack = getCurrentPages()

Page({
  onLoad() {
    // 获取实例
    const app = getApp()
    // 将头像和昵称渲染到页面中
    this.setData({...app.userProfile})
  },
  // 获取用户昵称
  getUserNickName(ev) {
    // console.log(ev)
    this.updateNickName(ev.detail.value)
  },
  async updateNickName(nickName) {
    if(nickName === '') return
    // 调用接口更新用户昵称
    const {code} = await wx.http.put('/userInfo',{nickName})
    if(code !== 10000) return wx.utils.toast('更新昵称失败')

    // 借助页面栈实例更新数据
    pageStack[0].setData({nickName})

    // 同步数据到应用实例中
    const app = getApp()
    app.userProfile.nickName = nickName
  },
  // 获取用户头像
  getUserAvatar(ev) {
    this.updateAvatar(ev.detail.avatarUrl)
  },
  // 更新用户头像
  updateAvatar(avatar) {
    // 调用 API 上传文件
    wx.uploadFile({
      // 接口地址
      url: wx.http.baseURL + '/upload',
      filePath: avatar,
      name: 'file',
      header: {
        // 用户登录状态
        Authorization: 'Bearer ' + getApp().token
      },
      formData: {
        type: 'avatar'
      },
      success: (result) => {
        // console.log(result)
        // 处理返回的数据
        const data = JSON.parse(result.data)
        // console.log(data)
        // 检测接口是否调用成功
        if(data.code !== 10000) return wx.utils.toast('头像上传失败')
        // 渲染头像
        pageStack[0].setData({avatar: data.data.url})
        // 在当前页面渲染头像
        this.setData({avatar: data.data.url})
        // 同步更新数据到应用实例中
        const app = getApp()
        app.userProfile.avatar =  data.data.url
      }
    })
  }
})