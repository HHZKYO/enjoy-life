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
    idcardFrontUrl: '',
    idcardBackUrl: '',
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
  async uploadPicture(ev) {
    // 区分用户上传的是正面或反面
    const type = ev.mark.type;

    try {
      // 打开相册或拍照
      const media = await wx.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sizeType: ["compressed"],
      });

      // 调用 API 上传图片
      wx.uploadFile({
        url: wx.http.baseURL + "/upload",
        filePath: media.tempFiles[0].tempFilePath,
        name: "file",
        header: {
          Authorization: "Bearer " + getApp().token,
        },
        success: (result) => {
          // 处理返回的 json 数据
          const data = JSON.parse(result.data);
          // 判断接口是否调用成功
          if (data.code !== 10000) return wx.utils.toast("上传图片失败!");
          // 渲染数据
          this.setData({ [type]: data.data.url });
        },
      });
    } catch (err) {
      // 获取图片失败
      console.log(err);
    }
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
})
