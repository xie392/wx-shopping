// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        orderLists:[],//页面数据
    },
    // 切换tab选项
    setIndex(options){
        let index = options.target.dataset.index;
        this.setData({
            index:index
        })
    },

    // 修改待收货
    setType(options){
        let id = options.target.dataset.id;
        let index = this.data.orderLists.findIndex(item=>item.orderId == id);
        this.setData({
            ["orderLists["+index+"].type"]:3  //待收货状态
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        let orderLists = wx.getStorageSync('goodsOrderList');
        this.setData({
            orderLists:orderLists
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
        wx.reLaunch({
            url:"/pages/my/my"
        })
        wx.setStorageSync('goodsOrderList', this.data.orderLists)
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