const HTTP = require("./request");
const {url} = require("./config");

module.exports = {
    getCategoryData:function(){
        return HTTP({
            url: url+'/api/public/v1/categories',
        })
    }
}
