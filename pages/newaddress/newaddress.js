// pages/newaddress/newaddress.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        phone: '',
        area: '',
        address: '',
        default: false,
        check: false,
        isShow: false, // 是否显示修改
        index: 0, // 修改/删除下标
    },
    // 获取收货人
    getName(e) {
        let title = e.detail.value;
        this.setData({
            name: title
        })
    },
    // 获取手机号
    getPhone(e) {
        let phone = e.detail.value;
        this.setData({
            phone
        })
    },
    // 获取地区
    getArea(e) {
        let area = e.detail.value;
        this.setData({
            area
        })
    },
    // 获取详细地址
    getAddress(e) {
        let address = e.detail.value;
        this.setData({
            address: address
        })
    },
    // 是否设置1为默认地址
    check() {
        let checked = this.data.default;
        let check = this.data.check;
        if (checked == "true") {
            checked = "false";
            check = false;
        } else {
            checked = "true";
            check = true;
        }
        this.setData({
            check
        })
    },
    // 定位
    getlocation() {
        let _this = this;
        wx.chooseLocation({
            type: "gcj02",
            success: (res) => {
                _this.setData({
                    area: res.address
                })
            }
        })
    },

    // 保存地址
    save() {
        let flag = this.common();
        if(flag){
            return;
        }
        let info = wx.getStorageSync("address") || [];
        if (this.data.check) {
            info.forEach((ele => {
                ele.checked = false;
            }))
        }
        info.push({
            name: this.data.name,
            phone: this.data.phone,
            area: this.data.area,
            address: this.data.address,
            checked: this.data.check
        })
        wx.setStorageSync('address', info);
        wx.navigateBack({ //返回上一页  
            delta: 1
        })
    },

    // 修改保存公共函数
    common() {
        if (this.data.name == "" || this.data.phone == "" || this.data.area == "" || this.data.address == "") {
            wx.showToast({
                title: '不能留空!',
                icon: 'none',
                duration: 1000
            })
            return true;
        }
    },

    // 修改地址
    mod() {
        let flag = this.common();
        if(flag){
            return;
        }
        let info = wx.getStorageSync("address") || [];
        if (this.data.check) {
            info.forEach((ele => {
                ele.checked = false;
            }))
        }
        let index = this.data.index;
        info[index] = {
            name: this.data.name,
            phone: this.data.phone,
            area: this.data.area,
            address: this.data.address,
            checked: this.data.check
        }
        wx.setStorageSync('address', info);
        wx.navigateBack({ //返回上一页  
            delta: 1
        })

    },
    // 删除地址
    del() {
        let index = this.data.index;
        let info = wx.getStorageSync("address") || [];
        info.splice(index, 1);
        wx.setStorageSync('address', info);
        wx.navigateBack({ //返回上一页  
            delta: 1
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        if (!options.name) {
            return;
        }
        this.setData({
            name: options.name,
            phone: options.phone,
            area: options.area,
            address: options.address,
            default: options.checked,
            isShow: true,
            index: options.index
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
    onShow: function (options) {

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