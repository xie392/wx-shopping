// pages/search/search.js
let {
    getGoodsSearch
} = require("../../api/Home");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        historySearch: [], // 历史搜索
        text: '', // 搜索内容
        find: ["电视", "小米", "华为", "电器", "充电器", "iphone", "家电"], // 搜索发现
        message: null, // 搜索建议
    },
    // 输入内容
    textChange(e) {
        getGoodsSearch({
            query: e.detail.value
        }).then(data => {
            // console.log('搜索建议=>',data.message);
            this.setData({
                message: data.message
            })
        })
        this.setData({
            text: e.detail.value,
        })


    },

    // 删除该搜索建议
    delSearch(e) {
        let index = e.currentTarget.dataset.index;
        let message = this.data.message;
        message.splice(index, 1);
        this.setData({
            message
        })
    },

    // 搜索
    search(e) {
        // console.log(e);
        let text = e.currentTarget.dataset.text;
        if(text==undefined){
            wx.showToast({
              title: '请输入内容',
              icon:'none'
            })
            return;
        }
        let historySearch = this.data.historySearch;
        if (text != undefined) {
            historySearch.push(text);
            this.setData({
                historySearch
            })
            wx.navigateTo({
                url: '/pages/searchList/searchList?text=' + text,
            })
        } else {
            historySearch.push(this.data.text);
            this.setData({
                historySearch
            })
            wx.navigateTo({
                url: '/pages/searchList/searchList?text=' + historySearch,
            })
        }
        this.setData({
            text: '',
            message: null
        })

    },


    // 删除历史搜索
    del() {
        let historySearch = this.data.historySearch;
        historySearch.splice(0, historySearch.length);
        this.setData({
            historySearch
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