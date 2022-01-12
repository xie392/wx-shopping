// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalData:0,
        goodsList:[
            // {
            //     id:1,
            //     goodsImage:"/images/goods01.jpg",
            //     goodsName:"商品名称1",
            //     goodsPrice:"200",
            //     num:1
            // },
            // {
            //     id:2,
            //     goodsImage:"/images/goods01.jpg",
            //     goodsName:"商品名称2",
            //     goodsPrice:"200",
            //     num:1
            // }
        ]
    },

    // 跳转支付页面
    goPay(){
        wx.navigateTo({
            url:"/pages/pay/pay"
        })
    },

    // 数量加一
    add(options){
        let index = options.target.dataset.id;
        let num = this.data.goodsList[index].num;
        let key = "goodsList["+index+"].num";
        this.setData({
            [key]:num+1
        })
        //计算总价格
        this.getTotal();
    },
    // 数量减一
    sub(options){
        let index = options.target.dataset.id;
        let num = this.data.goodsList[index].num;
        let key = "goodsList["+index+"].num";
        num = num <= 1? 1:num-1;
        this.setData({
            [key]:num
        })
        //计算总价格
        this.getTotal();
    },
    // 删除数据
    del(options){
        let index = options.currentTarget.dataset.id;
        this.data.goodsList.splice(index,1); //删除数据，不同步视图
        this.setData({
            goodsList:this.data.goodsList //重新赋值对象，渲染页面
        })
        //计算总价格
        this.getTotal();
    },

    // 计算总价格方法
    getTotal(){
        // 获取数据
        let goodsList = this.data.goodsList;
        if(!goodsList){
            return;
        }
        // 总价格
        let data = goodsList.reduce((total,item)=>{
            return total + item.num * item.goodsPrice;
        },0)
        this.setData({
            totalData:data
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
        // 获取数据
        var getCarData = wx.getStorageSync('goodsCarList');
        this.setData({
            goodsList:getCarData
        })
        //计算总价格
        this.getTotal();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // 离开页面，更新数据缓存
        wx.setStorageSync('goodsCarList', this.data.goodsList);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // 卸载页面，更新数据缓存
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