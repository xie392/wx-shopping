// components/tabBar/tabBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: { //父组件传递参数
        index:{
            type:Number, //类型（必填）String Number Boolean Object Array Null
            value:0
        }
    },

    // 1.自定义组件数据传参与方法传参
    // 数据传参properties自定义数据
    // 方法传参bind:[子组件调用方法]="父组件方法名称",通过子组件this.triggerEvent([子组件调用方法])调用

    /**
     * 组件的初始数据
     */
    data: {
        // index:0 //下标
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 自定义方法
        setIndex(){
            console.log("组件内方法")
            // 调用父组件传递过来方法
            // 调用父组件传递方法
            this.triggerEvent("setIndex");
        }
    }
})
