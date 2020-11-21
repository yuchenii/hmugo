import {
  request
} from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  onLoad: function (options) {

    this.getSwiperList();
    this.getCateList();
    this.getfloorList();

  },
  onShow: function () {
    // this.getSwiperList();
    // this.getCateList();
    // this.getfloorList();
  },

  //获取轮播图数据
  getSwiperList() {
    //发送异步请求请求轮播图
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });

    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },

    //获取分类导航数据
    getCateList() {
      request({
        url: "/home/catitems"
      }).then(result => {
        this.setData({
          catesList: result
        })
      })
    },

     //获取楼层数据
     getfloorList() {
      request({
        url: "/home/floordata"
      }).then(result => {
        this.setData({
          floorList: result
        })
      })
    }

})