/**
 * Created by yuanjianxin on 2018/3/13.
 */
const HttpUtil=require('yue-http-util');
const configServiceHandler=require('yue-config-service-handler');
let project=null;
let host=null;
let port=null;
let url=null;
const method='post';

let defaultHeaders=null;

let isConfig=false;

let time=null;

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

        time=Date.now();

        if(!isConfig)
            throw new Error('db handler should be config first!');

        try{
            let res=await configServiceHandler.instance.dispatch('DB_SERVICE');
            url='http://'+res;
        }catch (e){
            e=e && e.code || e.error;
            throw new Error('dispatch DB_SERVICE Error '+e)
        }
    }

    async handle(method,...para){

        await this.beforeHandler();
        let res=null;
        try{
            res=await this[method](...para);
            res=res.data;
        }catch (e){
            console.error('===DbService Error:',e)
        }finally {
            await this.afterHandler();
        }
        return res;
    }

    async afterHandler(){
        //todo sth
        console.log(`==DbService cost:${Date.now()-time} ms==`);
    }

    async get(table,paras){
        let data={
            project,
            table,
            method:'get',
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async getOne(table,field,paras){
        let data={
            project,
            table,
            method:'getOne',
            where:field,
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async list(table,where){
        let data={
            project,
            table,
            method:'list',
            where
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async save(table,paras,id=null,where='id'){
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

    async update(table,where,paras){
        let data={
            project,
            table,
            method:'update',
            where,
            paras
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async delete(table,id){
        let data={
            project,
            table,
            method:'delete',
            paras:id,
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async multiGet(table,id){
        let data={
            project,
            table,
            method:'multiGet',
            paras:id,
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async toOne(table,where,field,result){
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

    async toMany(table,where,field,result){
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

    async count(table,where){
        let data={
            project,
            table,
            method:'count',
            where
        }
        return await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
    }

    async sum(table,field,where){
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