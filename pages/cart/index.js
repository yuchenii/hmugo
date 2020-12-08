import{
  chooseAddress
} from "../../utils/asyncWx";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
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
    //获取缓存中的收货地址信息
    let address = wx.getStorageSync("address");
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    //给data赋值
    this.setData({
      address
    });

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

  },
  //点击收货地址
  async handleChooseAddress() {
    //scope.address现在默认为true不用判断，pc微信开发工具有问题，用手机真机调试即可
    try {
      const address = await chooseAddress();
      wx.setStorageSync("address", address);
      
    } catch (error) {
      console.log(error);
    }
  }
})