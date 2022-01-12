const HTTP = require("./request");
const {url} = require("./config");

module.exports = {
    getHomeBanner:function(){
        return HTTP({
            // method:"post",
            // data:{},
            url: url+'/api/public/v1/home/swiperdata',
        })
    },
    getHomeGoods:function(data){
        return HTTP({
            url: url+"/api/public/v1/goods/search",
            data
        })
    },
    getGoodsDetail:function(data){
        return HTTP({
            url: url+"/api/public/v1/goods/detail",
            data
        })
    },
    // 搜索建议  http://47.93.52.8:8087/api/public/v1/goods/qsearch
    getGoodsSearch:function(data){
        return HTTP({
            url: url+"/api/public/v1/goods/qsearch",
            data
        })
    },
}