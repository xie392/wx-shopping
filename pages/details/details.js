// pages/details/details.js
const {
    getGoodsDetail
} = require("../../api/Home");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [
            "/images/banner01.jpg",
            "/images/banner02.jpg",
            "/images/banner03.jpg",
            "/images/banner04.jpg",
        ],
        num: 0, //商品数量
        goods: {
            id: 2,
            goodsImage: "/images/banner01.jpg",
            goodsName: "商品名称",
            goodsImgs: [
                "/images/banner01.jpg",
                "/images/banner02.jpg",
                "/images/banner03.jpg",
                "/images/banner04.jpg",
            ],
            goodsAddress: "广州",
            goodsPrice: "200",
            goodsPriceOld: "300",
            goodsDetails: "/images/IMG_0466.jpg"
        },
        id: 0,
        isCollect: false, // 是否收藏
    },
    // 数据缓存
    // 数据缓存
    // wx.setStorageSync
    // wx.getStorageSync
    // wx.removeStorageSync
    // wx.clearStorageSync
    // wx.getStorageInfoSync
    // 1.添加数据与修改数据
    // wx.setStorageSync('goodsListsData', ["这是商品数据列表-988888"])
    // 2.获取数据
    // let data = wx.getStorageSync("goodsListsData");
    // console.log(data);
    // 3.删除数据
    // wx.removeStorageSync("goodsListsData");
    // 4.清空数据
    // wx.clearStorageSync();
    // 5.获取缓存信息
    // let infoData = wx.getStorageInfoSync();
    // console.log(infoData);

    // 同步数据缓存
    // wx.setStorage
    // wx.getStorage
    // wx.removeStorage
    // wx.clearStorage
    // wx.getStorageInfo
    // 加入购物车
    setCart() {
        // 购物车数据结构
        let cartLists = {
            id: this.data.goods.id,
            goodsImage: this.data.goods.goodsImage,
            goodsName: this.data.goods.goodsName,
            goodsPrice: this.data.goods.goodsPrice,
            num: 1
        };
        // 数据添加数据缓存中
        // 1.判断数据缓存中是否存在
        let goodsCarList = wx.getStorageSync("goodsCarList"); //获取数据
        if (goodsCarList) {
            // 2.有数据.
            let index = goodsCarList.findIndex(item => item.id == this.data.goods.id);
            if (index != -1) { //有值返回下标，没有值返回-1
                // 2.1 判断是否有相同数据，数量加一
                goodsCarList[index].num += 1;
            } else {
                // 2.2 没有相同数据，添加数据
                goodsCarList.push(cartLists);
            }
            // 更新数据
            wx.setStorageSync('goodsCarList', goodsCarList)
        } else {
            // 3.没有数据，直接添加数据
            wx.setStorageSync('goodsCarList', [cartLists]);
        }
        // 更新商品数量
        this.setData({
            num: wx.getStorageSync('goodsCarList').length
        })

    },


    // 跳转购物车页面
    goCar() {
        wx.switchTab({
            url: '/pages/car/car',
        })
    },

    // 跳转首页
    goHome() {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    // 跳转支付页
    goPay() {
        wx.navigateTo({
            url: '/pages/pay/pay',
        })
        this.setCart();
    },

    // 收藏
    getCollect(e) {
        let data = {
            id: this.data.goods.id,
            goodsImage: this.data.goods.goodsImage,
            goodsName: this.data.goods.goodsName,
            goodsAddress:this.data.goods.goodsAddress,
            goodsPrice: this.data.goods.goodsPrice
        };
        let isCollect = this.data.isCollect;
        isCollect = !isCollect;
        let list = wx.getStorageSync('collect') || [];
        let id = e.currentTarget.dataset.id;
        if (isCollect) {
            list.push(data);
            wx.setStorageSync('collect', list);
        } else {
            list.forEach((ele, i) => {
                if (ele.id == id) {
                    list.splice(i, 1);
                }
            })
            wx.setStorageSync('collect', list);
        }
        this.setData({
            isCollect
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        this.setData({
            id: options.id
        })
        getGoodsDetail({
            goods_id: options.id
        }).then((data) => {
            console.log(data);
            let {
                goods_id,
                goods_small_logo,
                goods_name,
                pics,
                goods_price,
                goods_introduce
            } = data.message;
            let goods = {
                id: goods_id,
                goodsImage: goods_small_logo,
                goodsName: goods_name,
                goodsImgs: pics,
                goodsAddress: "广州",
                goodsPrice: goods_price,
                goodsPriceOld: goods_price + 100,
                goodsDetails: goods_introduce
            }
            this.setData({
                goods
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
        let list = wx.getStorageSync('collect') || [];
        let isCollect = this.data.isCollect;
        // console.log(this.data.id, list);
        list.forEach(ele => {
            if (ele.id == this.data.id) {
                isCollect = true;
            }
        })
        this.setData({
            num: wx.getStorageSync('goodsCarList').length,
            isCollect
        })
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