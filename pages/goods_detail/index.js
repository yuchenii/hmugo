// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsObj:{},
      isCollect: false
  },

  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    // console.log(options);
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);

  },
  
  //获取商品详情
  async getGoodsDetail(goods_id){
      const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
      this.GoodsInfo = goodsObj;
      // 获取缓存中的商品收藏数组
      let collect = wx.getStorageSync("collect") || [];
      // 判断是否被收藏
      let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);

      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          //iphone部分手机不支持webp图片格式
          goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObj.pics
        },
        isCollect: isCollect,
      })

  },

  // 收藏
  handleCollect(){
    let isCollect=false;
     // 获取缓存中的商品收藏数组
     let collect = wx.getStorageSync("collect") || [];
     // 判断是否被收藏
     let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
     // index !==-1表示被收藏过了
     if(index !==-1){
       collect.splice(index,1);
       isCollect = false;
       wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });

     }else{
       collect.push(this.GoodsInfo);
       isCollect=true;
       wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });

     }
     wx.setStorageSync("collect", collect);
     this.setData({
       isCollect: isCollect
     });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  //点击轮播图预览大图
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: urls
    })
  },
  //点击加入购物车
  handleCartAdd(){
    //获取缓存中购物车数组
    let cart = wx.getStorageSync("cart")||[];
    //判断商品是否已经存在购物车内
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      //不存在
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      //已存在加一
      cart[index].num++;
    }
    //把购物车添加入缓存中
    wx.setStorageSync("cart",cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });

  }
})