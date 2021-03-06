// pages/searchList/searchList.js
let {
    getHomeGoods
} = require("../../api/Home");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let arr = [];
        getHomeGoods({
            query: options.text
        }).then(data => {
            let list = data.message.goods;
            list.forEach(ele => {
                let {
                    goods_id,
                    goods_small_logo,
                    goods_price,
                    goods_name
                } = ele;
                let data = {
                    id: goods_id,
                    goodsImage: goods_small_logo,
                    goodsName: goods_name,
                    goodsAddress: "广州",
                    goodsPrice: goods_price
                };
                arr.push(data)
            })
            this.setData({
                goodsList:arr
            })
            console.log(arr);
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