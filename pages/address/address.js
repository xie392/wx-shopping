// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: []
    },

    // 选中框
    change(e) {
        let value = e.detail.value;
        let list = this.data.info;
        list.forEach(ele => {
            ele.checked = false;
        })
        list[value].checked = true;
        this.setData({
            info: list
        })
        wx.setStorageSync('address', list);
    },
    // 选中函数
    checkAll() {
        let list = this.data.info;
        if(!list){
            return;
        }
        if (list.length == 1) {
            list[0].checked = true;
        }
        this.setData({
            info: list
        })
        let flag = true;
        list.forEach(ele => {
            if (ele.checked) {
                flag=false;
            }
        })
        if (flag) {
            list[0].checked = true;
            this.setData({
                info: list
            })
        }



    },
    // 删除
    del(options) {
        let index = options.currentTarget.dataset.index;
        let info = this.data.info;
        info.splice(index, 1);
        this.setData({
            info
        });
        wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
        })
        wx.setStorageSync('address', info)
        this.checkAll();
    },
    // 编辑
    mod(e) {
        let index = e.currentTarget.dataset.index;
        let name = this.data.info[index].name;
        let phone = this.data.info[index].phone;
        let area = this.data.info[index].area;
        let address = this.data.info[index].address;
        let checked = this.data.info[index].checked;
        let str = `name=${name}&phone=${phone}&area=${area}&address=${address}&checked=${checked}&index=${index}`;
        wx.navigateTo({
            url: '/pages/newaddress/newaddress?' + str
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
        let info = wx.getStorageSync('address') || [];
        if(info.length==0){
            return;
        }
        this.setData({
            info
        });
        this.checkAll();
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