/**
 * Created by yuanjianxin on 2018/3/13.
 */
const HttpUtil=require('yue-http-util');
const configServiceHandler=require('yue-config-service-handler');
const helper=require('yue-helper');
let project=null;
let host=null;
let port=null;

const method='post';

let defaultHeaders=null;

let isConfig=false;


module.exports=class _handler{

    static get instance(){
        if(!_handler._instance)
            _handler._instance=new _handler();
        return _handler._instance;
    }

    static config(config){
        if(!config)
            throw new Error('Invalid config')

        if(!config.project)
            throw new Error('project should be config')
        project=config.project;

        if(!config.host)
            throw new Error('host should be config')

        host=config.host;

        if(!config.port)
            throw new Error('port should be config')

        port=config.port;
        defaultHeaders={};//todo
        isConfig=true;
        configServiceHandler.instance.init({host,port})
    }


    async beforeHandler(){

        let time=Date.now();
        let url=null;

        if(!isConfig) throw new Error('db handler should be config first!');

        try{
            let res=await configServiceHandler.instance.dispatch('DB_SERVICE');
            url=res[helper.rangeRandom(0,res.length-1)];
        }catch (e){
            e=e && e.code || e.error;
            throw new Error('dispatch DB_SERVICE Error '+e)
        }

        return {time,url}
    }

    async handle(method,...para){

        let {time,url}=await this.beforeHandler();
        let res=null;
        try{
            res=await this[method](url,...para);
            res=res.data;
        }catch (e){
            console.error('===DbService Error:',e)
        }
        await this.afterHandler(time);
        return res;
    }

    async afterHandler(time){
        //todo sth
        console.log(`==DbService cost:${Date.now()-time} ms==`);
    }

    async get(url,table,paras){
        let data={
            project,
            table,
            method:'get',
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async getOne(url,table,field,paras){
        let data={
            project,
            table,
            method:'getOne',
            where:field,
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async list(url,table,where){
        let data={
            project,
            table,
            method:'list',
            where
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async save(url,table,paras,id=null,where='id'){
        id && (paras[where]=id);
        let data={
            project,
            table,
            method:'save',
            where,
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async update(url,table,where,paras){
        let data={
            project,
            table,
            method:'update',
            where,
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async delete(url,table,id){
        let data={
            project,
            table,
            method:'delete',
            paras:id,
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async multiGet(url,table,id){
        let data={
            project,
            table,
            method:'multiGet',
            paras:id,
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async toOne(url,table,where,field,result){
        let data={
            project,
            table,
            method:'toOne',
            where,
            paras:field,
            result
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async toMany(url,table,where,field,result){
        let data={
            project,
            table,
            method:'toMany',
            where,
            paras:field,
            result
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async count(url,table,where){
        let data={
            project,
            table,
            method:'count',
            where
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async sum(url,table,field,where){
        let data={
            project,
            table,
            method:'sum',
            where,
            paras:field
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }
}