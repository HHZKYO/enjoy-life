// house_pkg/pages/locate/index.ts

// 导入腾讯位置服务
import QQMap from '../../../utils/qqmap'

Page({
  data: {
    points: [],
    address: ''
  },
  onLoad() {
    this.getLocation()
  },

  // 获取用户位置
  async getLocation() {
    // 调用 API
    const {latitude, longitude} = await wx.getLocation()
    // console.log(latitude, longitude)
    this.getPoint(latitude, longitude)
  },

  getPoint(latitude, longitude) {
    wx.showLoading({
      title: '正在加载...',
    })

    // 逆地址解析（根据经纬度来获取地址）
    QQMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({ result: { address } }) => {
        // 数据数据
        this.setData({ address })
      },
    })
    
    // search 是实现地点搜索功能的方法
    QQMap.search({
      keyword: '住宅小区', //搜索关键词
      location: [latitude, longitude].join(','), //设置周边搜索中心点
      page_size: 5,
      success: (result) => {
        // 过滤掉多余的数据
        const points = result.data.map(({ id, title, _distance }) => {
          return { id, title, _distance }
        })
        // 渲染数据
        this.setData({ points })
      },
      fail: (err) => {
        console.log(err)
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})