// pages/pay/index.js
import {
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx";

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0

  },
  onShow: function () {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数据
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    });
    //总价格 数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
    
  },

  // 支付需要企业账号
  // 点击 支付
  handleOrderPay(){
    // 判断缓存中有没有token
    const token = wx.getStorageSync("token");
    // 判断
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    console.log("token已存在");
  }
})