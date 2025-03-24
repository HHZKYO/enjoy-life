// components/authorization/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },

  lifetimes: {
    attached() {
      // 获取登录状态
      const isLogin = !!getApp().token
      // 变更登录状态
      this.setData({isLogin})
      // 获取页面栈
      const pageStack = getCurrentPages()
      // 获取页面路径
      const {route} = pageStack.pop()
      // 未登录状态下跳转到登录页
      if(!isLogin) {
        wx.redirectTo({
          url: '/pages/login/index?redirectURL=/' + route,
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})