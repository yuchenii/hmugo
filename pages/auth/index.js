// pages/auth/index.js
import {
  request
} from "../../request/index.js";
import {
  login
} from "../../utils/asyncWx";

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try{
      // 获取用户信息
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    // 获取小程序登陆成功后的code
    const { code } = await login();
    const loginParams = { encryptedData,rawData,iv,signature,code};
    // 发送请求 获取用户的token 需要企业账号否则返回为null
    // 没有企业账号 用的文档中的token值测试 如有 请取消下面第一行注释 并注释第二三行
    //const token = await request({url:"/users/wxlogin",data:loginParams, method:"post"});
    let token = await request({url:"/users/wxlogin",data:loginParams, method:"post"});
    token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    // 把token存入缓存中 同时跳回上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error);
    }
  }
})