import{
  chooseAddress, showModal, showToast
} from "../../utils/asyncWx";

Page({
  data: {
    address:{},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0

  },
  onShow: function () {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setCart(cart);
  },
  //点击收货地址
  async handleChooseAddress() {
    //scope.address现在默认为true不用判断，pc微信开发工具有问题，用手机真机调试即可
    try {
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      wx.setStorageSync("address", address);
      
    } catch (error) {
      console.log(error);
    }
  },
  //商品的选中
  handleItemChange(e){
   //  获取被修改的商品的id
   const goods_id = e.currentTarget.dataset.id;
   //  获取购物车数组 
   let { cart } = this.data;
   //  找到被修改的商品对象
   let index = cart.findIndex(v => v.goods_id === goods_id);
   // 选中状态取反
   cart[index].checked = !cart[index].checked;

   this.setCart(cart);
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
     //全选
     let allChecked = true;
     //总价格 数量
     let totalPrice=0;
     let totalNum=0;
     cart.forEach(v => {
       if(v.checked){
         totalPrice += v.num*v.goods_price;
         totalNum += v.num;   
       }else{
         allChecked=false;
       }   
     });
     // 判断数组是否为空
     allChecked = cart.length != 0 ? allChecked : false;
     this.setData({
       cart,
       totalPrice, totalNum, allChecked
     });
     wx.setStorageSync("cart", cart);
},
//全选 反选
handleItemAllCheck(){
  //获取data中的数据
  let {cart,allChecked} = this.data;
  //修改值
  allChecked = !allChecked;
  //循环修改cart数组中商品的选中状态
  cart.forEach(v => v.checked = allChecked);
  //将修改后的值填充回data或者缓存中
  this.setCart(cart);

},
//商品数量编辑
async handleItemNumEdit(e){
  //获取传递过来的参数
  const {operation,id} = e.currentTarget.dataset;
  //获取购物车数组
  let {cart} = this.data;
  //找到需要更改的商品索引
  const index = cart.findIndex(v=>v.goods_id===id);
  //判断是否需要删除
  if(cart[index].num === 1 && operation === -1){
    //弹窗提示
    const res = await showModal({content:"您是否要删除"});
    if(res.confirm){
      cart.splice(index,1);
      this.setCart(cart);
    }
  }else{
  //修改数量
  cart[index].num += operation;
  //设置回缓存和data中
  this.setCart(cart);
  }
},
async handlePay(){
  //判断收货地址
  const {address,totalNum} = this.data;
  if(!address.userName){
    await showToast({title: "您还没有选择收货地址"});
    return;
  }
  //判断有没有选购商品
  if(totalNum === 0){
    await showToast({title: "您还没有选购商品"});
    return;
  }
  //跳转支付页面
  wx.navigateTo({
    url: '/pages/pay/index'
  });
}
})