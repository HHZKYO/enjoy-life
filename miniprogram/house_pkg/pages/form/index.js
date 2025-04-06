// \u4e00-\u9fa5] 中文验证规则

// 导入表单验证插件
import wxValidate from 'wechat-validate'

Page({
  behaviors: [wxValidate],
  data: {
    point: '',
    building: '',
    room: '',
    name: '',
    gender: '1',
    mobile: '',
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
  },
  rules: {
    name: [
      { required: true, message: '请填写您的真实姓名' },
      { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '业主姓名只能为中文' },
    ],
    mobile: [
      { required: true, message: '请输入您的手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
    ],
    idcardFrontUrl: [
      { required: true, message: '请上传身份证正面' },
    ],
    idcardBackUrl: [
      { required: true, message: '请上传身份证反面' },
    ]
  },
  onLoad({ point, building, room }) {
    this.setData({ point, building, room })
  },
  submitForm() {
    // wx.reLaunch({
    //   url: '/house_pkg/pages/list/index',
    // })
    this.validate()
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
})
