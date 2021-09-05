// pages/feedback/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "体验问题",
      isActive: true
    }, {
      id: 0,
      value: "商品、商家投诉",
      isActive: false
    }],
    // 选中图片数组
    chooseImgs: [],
    textVal: ""
  },

  // 选择图片
  handleChooseImg() {
    // 调用微信选择图片api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        });
      },
      fail: () => {},
      complete: () => {}
    });
  },

  // 移除图片
  handleRemoveImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    // console.log(index);

    let {
      chooseImgs
    } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    });
  },

  // 输入文字
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    });
  },


  // 外网的图片的路径数组
  UpLoadImgs: [],
  // 提交反馈
  handleFormSubmit() {
    const {
      textVal,
      chooseImgs
    } = this.data

    // 合法性验证
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return;
    }

    // 3 准备上传图片 到专门的图片服务器 
    // 上传文件的 api 不支持 多个文件同时上传  遍历数组 挨个上传 
    // 显示正在等待的图片
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });


    // 判断有没有需要上传的图片数组
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://api.uomg.com/api/image.juejin',
          // 被上传的文件的路径
          filePath: v,
          // 上传的文件的名称 后台来获取文件  file
          name: "file",
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);

            // 所有的图片都上传完毕了才触发  
            if (i === chooseImgs.length - 1) {

              wx.hideLoading();


              console.log("把文本的内容和外网的图片数组 提交到后台中");
              //  提交都成功了
              // 重置页面
              this.setData({
                textVal: "",
                chooseImgs: []
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });

            }
          }
        });
      })
    } else {
      wx.hideLoading();

      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });

    }


  },

  // tab
  handleItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})