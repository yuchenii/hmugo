// pages/category/index.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧商品数据
    rightContent: [],
    //左侧被选中菜单
    currentIndex: 0,
    scrollTop: 0

  },
  //接口返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
     
    }
    else{
      if(Date.now()-Cates.time>1000*300)
      {
        
        this.getCates();
       

      }
      else{
        this.Cates = Cates.data;
        //构造左侧的菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        //构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  this.getCates();
  },

  //获取分类数据
  async getCates() {
    // request({
    //     url: "/categories"
    //   })
    //   .then(res => {
    //     this.Cates = res.data.message;
    //     //把接口数据存储到本地
    //     wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

    //     //构造左侧的菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     //构造右侧的商品数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    const res = await request({url:"/categories"});
    // this.Cates = res.data.message;
    this.Cates = res;
        //把接口数据存储到本地
        wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

        //构造左侧的菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        //构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      
     
  },

  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }


})