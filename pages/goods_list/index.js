// pages/goods_list/index.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tabs:[
      {
        id:0,
        value:"综合",
        isActive: true
      },  {
        id:0,
        value:"销量",
        isActive: false
      },  {
        id:0,
        value:"排行",
        isActive: false
      }
    ],
    goodsList:[]

  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  handleItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();

  },

  async getGoodsList(){
    //获取商品列表数据
    const res = await request({url:"/goods/search",data:this.QueryParams});
    //获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...res.goods],
      
    });

    //关闭下拉刷新窗口
    wx.stopPullDownRefresh();
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

  },

  //页面上滑滚动条触底事件
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
     wx.showToast({
       title: '没有下一页了'
     });
    }
    else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
 
   },
   //下拉刷新
   onPullDownRefresh(){
     this.setData({
       goodsList:[]
     });
     this.QueryParams.pagenum=1;
     this.getGoodsList();
   }
})