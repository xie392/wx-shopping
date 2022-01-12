module.exports = function HTTP(objAll){
    return new Promise(function(resolve,reject){
        wx.request({
            header:{
                'content-type' : 'application/json'
            },
            ...objAll,
            success(res){ //成功返回
                resolve(res.data);
            },
            fail(err){ //失败返回
                reject(err);
            },
            complete(){ //接口执行完后调用

            }
          })
    })
}