/**
 * Created by yuanjianxin on 2018/3/13.
 */
const HttpUtil=require('yue-http-util');
let project=null;
let host=null;
let port=null;
let url=null;
const method='post';

let defaultHeaders=null;

let isConfig=false;

module.exports=class _handler{

    static get instance(){
        if(!_handler._instance)
            _handler._instance=new _handler();

        if(!isConfig)
            throw new Error('db handler should be config first!');

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

        url=config.url && config.url || '';
        url=host+':'+port+url;

        defaultHeaders={};//todo
        isConfig=true;
    }

    async get(table,paras){
        let data={
            project,
            table,
            method:'get',
            paras
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
        }
    }

    async getOne(table,field,paras){
        let data={
            project,
            table,
            method:'getOne',
            where:field,
            paras
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }

    async list(table,where){
        let data={
            project,
            table,
            method:'list',
            where
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
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
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }

    async update(table,where,paras){
        let data={
            project,
            table,
            method:'update',
            where,
            paras
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }

    async delete(table,id){
        let data={
            project,
            table,
            method:'delete',
            paras:id,
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }

    async multiGet(table,id){
        let data={
            project,
            table,
            method:'multiGet',
            paras:id,
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e);
            return null;
        }
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
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
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
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }

    async count(table,where){
        let data={
            project,
            table,
            method:'count',
            where
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }

    async sum(table,field,where){
        let data={
            project,
            table,
            method:'sum',
            where,
            paras:field
        }
        try{
            let res=await HttpUtil.instance.sendRequest(method,url,data,defaultHeaders);
            return res.data;
        }catch (e){
            console.error('===DbService Error:',e)
            return null;
        }
    }
}