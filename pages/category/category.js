// pages/category/category.js
let { getCategoryData } = require("../../api/Category");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 2.静态数据显示页面中
        // 双向数据绑定
        scrollHeight:400,
        num:0,//默认下标
        categoryItem:[
            "签到",
            "附近",
            "展会",
            "福利",
            "玩乐",
            "体育",
            "周边",
            "亲子",
        ],
        content:[
            [
                {
                    img:"/images/goods01.jpg",
                    name:"商品"
                },
                {
                    img:"/images/goods01.jpg",
                    name:"商品"
                },
            ],[
                {
                    img:"/images/goods02.jpg",
                    name:"商品"
                },
                {
                    img:"/images/goods02.jpg",
                    name:"商品"
                },
            ],[
                {
                    img:"/images/goods03.jpg",
                    name:"商品"
                },
                {
                    img:"/images/goods03.jpg",
                    name:"商品"
                },
            ],
        ]
    },
    // 自定义方法,修改num值
    setNum(options){
        console.log("自定义方法");
        console.log(options);
        console.log(options.target.dataset.index);
        // 修改num值
        this.setData({
            num:options.target.dataset.index

        })
    },
    // 点击跳转列表页
    goClass(options){
        // console.log(options);
        wx.navigateTo({
            url:'/pages/class/class?cid='+options.currentTarget.dataset.id
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log("onLoad生命周期函数--监听页面加载");
        // 微信提供api接口，获取系统信息
        // 1.获取数据
        wx.getSystemInfo({
            success:(result)=>{
                console.log(result);
                console.log(result.windowHeight);
                // 修改data里面数据
                // 调用this.setData();
                // 3.获取数据赋值data静态数据中
                this.setData({
                    scrollHeight:result.windowHeight
                })
            }
        });
        getCategoryData().then((data)=>{
            console.log(data);
            let lists = data.message;
            let categoryItem = [];
            let content = [];
            lists.forEach(ele=>{
                categoryItem.push(ele.cat_name);
                content.push(ele.children)
            })
            this.setData({
                categoryItem,
                content
            })
        });


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log("onReady生命周期函数--监听页面初次渲染完成");

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log("onShow生命周期函数--监听页面显示");
        let index = wx.getStorageSync("categroyIndex") || 0;
        this.setData({
            num:index
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("onHide生命周期函数--监听页面隐藏");

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