// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: null,
        totalData: 0,
        goodsList: [
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
    // 计算总价格方法
    getTotal() {
        // 获取数据
        let goodsList = this.data.goodsList;
        if (!goodsList) {
            return;
        }
        // 总价格
        let data = goodsList.reduce((total, item) => {
            return total + item.num * item.goodsPrice;
        }, 0)
        this.setData({
            totalData: data
        })
    },
    // 跳转订单页面
    goOrder() {
        if(this.data.info==null){
            wx.showToast({
              title: '收获地址不能为空!',
              icon:'none'
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/order/order',
        })
        // 生成订单数据
        this.setOrderLists(2); //支付完成
    },
    // 生成订单数据
    setOrderLists(type) {

        // 没有购物车数据，不执行添加订单操作
        let goodsCarlists = wx.getStorageSync('goodsCarList');
        if (!goodsCarlists) {
            return;
        }

        // 构建数据结构
        let orderData = {
            orderId: new Date().getTime(),
            orderLists: null,
            type: type, // 1.待支付 2.代发货 3.待收货 4.待评价
            total: this.data.totalData
        }
        // 添加商品
        orderData.orderLists = this.data.goodsList;

        // 1.判断缓存有没有数据
        let goodsCarListData = wx.getStorageSync("goodsOrderList");
        if (goodsCarListData) {
            // 2.有数据添加数据
            goodsCarListData.push(orderData);
            wx.setStorageSync('goodsOrderList', goodsCarListData);
        } else {
            // 3.没有添加订单
            wx.setStorageSync('goodsOrderList', [orderData])
        }

        // 删除购物车数据
        wx.removeStorageSync('goodsCarList')




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
            goodsList: getCarData
        })
        //计算总价格
        this.getTotal();
        let info = wx.getStorageSync('address') || [];
        info.forEach(ele => {
            if (ele.checked) {
                this.setData({
                    info: ele
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // 生成订单数据
        this.setOrderLists(1); //待支付
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