// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
        hasUserInfo: false, //判断用户信息
        canIUseGetUserProfile: false, //判断微信小程序版本
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 判断高版本getUserProfile可不可用
        if(wx.getUserProfile){  //判断有没有方法
            this.setData({
                canIUseGetUserProfile:true
            })
        }

        // 注意：必须登录自己微信账号，不要使用游客模式
        // 2.10.0以下版本登录信息获取方式
        // 第一种写法
        // wx.getUserInfo({
        //   lang: "zh_CN",
        //   success:(res)=>{
        //     console.log(res);
        //   }
        // })
    },
    // 获取用户信息
    getUserProfile(){
        // 2.10.0以上版本登录信息获取方式
        wx.getUserProfile({
            desc:"用于获取信息",
            success:(res)=>{
                console.log(res);
                this.setData({
                    userInfo:res.userInfo,
                    hasUserInfo:true
                })
            }
        })
    },
    // 获取用户信息
    // 第二种写法
    getUserInfo(e){
        console.log(e.detail.userInfo);
        this.setData({
            userInfo:e.detail.userInfo,
            hasUserInfo:true
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