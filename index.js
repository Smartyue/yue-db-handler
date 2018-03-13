/**
 * Created by yuanjianxin on 2018/3/13.
 */
const axios=require('axios');
const qs=require('qs');
const Method=['post','put','patch'];
module.exports=class _handler{

    static get instance(){
        if(!_handler._instance)
            _handler._instance=new _handler();
        return _handler._instance;
    }

    async sendRequest(method,url,data,headers){
        let config={
            method,
            url,
            headers
        }

        Method.includes(method.toLowerCase()) && (config.data=data)

        method.toLowerCase()==='get' && (config.params=data);

        let content_type=headers['Content-Type'] && headers['Content-Type'].split(';')[0] || null;
        content_type==='application/x-www-form-urlencoded' && (config.transformRequest=[function (data) {
            return qs.stringify(data);
        }]);

        return new Promise((resolve,reject)=>{
            axios(config).then(res=>{
                res=res && res.data || res;
                resolve(res);
            }).catch(err=>{
                err=err.response && err.response.data || err;
                reject(err);
            });
        });
    }

}