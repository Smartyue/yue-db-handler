/**
 * Created by yuanjianxin on 2018/3/13.
 */
const _handler=require('./lib/_handler');
module.exports=(configs)=>{
    _handler.config(configs);
    return _handler.instance;
}