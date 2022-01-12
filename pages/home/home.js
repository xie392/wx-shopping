let { getHomeBanner,getHomeGoods } = require("../../api/Home");
let { getCategoryData } = require("../../api/Category");

Page({

  /**
   * 页面的初始数据
   */
  data: {
        imgs:[
            // "/images/banner01.jpg",
            // "/images/banner02.jpg",
            // "/images/banner03.jpg",
            // "/images/banner04.jpg",
        ],
        iconArray:[
            {
                url:"/images/icon-qiandao.png",
                text:"签到",
            },
            {
                url:"/images/icon-fujin.png",
                text:"附近",
            },
            {
                url:"/images/icon-zhanhui.png",
                text:"展会",
            },
            {
                url:"/images/icon-fuli.png",
                text:"福利",
            },
            {
                url:"/images/icon-muma.png",
                text:"玩乐",
            },
            {
                url:"/images/icon-tiyu.png",
                text:"体育",
            },
            {
                url:"/images/icon-xingxing.png",
                text:"周边",
            },
            {
                url:"/images/icon-qinzi.png",
                text:"亲子",
            },
        ],
        goodsList:[
            // {
            //     id:1,
            //     goodsImage:"/images/goods01.jpg",
            //     goodsName:"商品名称1",
            //     goodsAddress:"广州",
            //     goodsPrice:"200"
            // },
            // {
            //     id:2,
            //     goodsImage:"/images/goods01.jpg",
            //     goodsName:"商品名称2",
            //     goodsAddress:"广州",
            //     goodsPrice:"200"
            // }
        ]
  },

//   父组件方法
  HomesetIndex(){
    console.log("父组件方法")
  },

//   跳转分类页面
  goCategory(options){
    //   console.log(options.currentTarget.dataset.index);
      let index = options.currentTarget.dataset.index;
    //   小程序中数据缓存
    wx.setStorageSync("categroyIndex", index);
    wx.switchTab({
      url: '/pages/category/category',
    })
  },    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getHomeBanner().then((data)=>{
        this.setData({
            imgs:data.message
        })
    })
    getHomeGoods().then((data)=>{
        // console.log(data);
        let lists = [];
        let goodslists = data.message.goods;
        goodslists.forEach(item=>{
            let {goods_id,goods_small_logo,goods_price,goods_name} = item;
            let data = {
                id:goods_id,
                goodsImage:goods_small_logo,
                goodsName:goods_name,
                goodsAddress:"广州",
                goodsPrice:goods_price
            };
            if(goods_small_logo){
                lists.push(data);
            }
        })
        this.setData({
            goodsList:lists
        })
    })
    getCategoryData().then((data)=>{
        // console.log(data);
        let lists = data.message;
        let iconArray = this.data.iconArray;
        iconArray.forEach((item,index)=>{
            // console.log(item,index)
            iconArray[index].text = lists[index].cat_name;
        })
        this.setData({
            iconArray:iconArray
        })
    })
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