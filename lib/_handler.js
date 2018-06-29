/**
 * Created by yuanjianxin on 2018/3/13.
 */
const HttpUtil = require('yue-http-util');

const method = 'post';

const defaultHeaders = {};

module.exports = class _handler {

    static get instance() {
        if (!_handler._instance)
            _handler._instance = new _handler();
        return _handler._instance;
    }

    constructor() {
        this.host = null;
        this.port = null;
        this.dataSource = null;
        this.isConfig = false;
    }

    config({host, port, dataSource}) {
        if (this.isConfig)
            return undefined;
        if (!host) throw new Error(`==DBService host need config!==`);
        if (!port) throw new Error(`==DBService port need config!==`);
        if (!dataSource) throw new Error(`==DBService dataSource need config!==`);

        if (!host.startsWith('http://') && !host.startsWith('https://'))
            throw new Error(`Invalid host:${host},should startsWith http:// or https://`);

        this.host = host;
        this.port = port;
        this.dataSource = dataSource;
        this.isConfig = true;


        // alias
        this.findById = this.get;
        this.findOne = this.getOne;
        this.findAll = this.list;
        this.create = this.save;

    }

    async get(table, paras, _dataSource) {
        let url = this.host + ':' + this.port;
        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'get',
            paras
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }


    async getOne(table, field, paras, _dataSource) {
        let url = this.host + ':' + this.port;
        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'getOne',
            where: field,
            paras
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async list(table, where, _dataSource) {
        let url = this.host + ':' + this.port;
        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'list',
            where
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async save(table, paras, where = 'id', _dataSource) {
        let url = this.host + ':' + this.port;
        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'save',
            where,
            paras
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async update(table, where, paras, _dataSource = null) {

        let url = this.host + ':' + this.port;

        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'update',
            where,
            paras
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async delete(table, id, _dataSource) {

        let url = this.host + ':' + this.port;

        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'delete',
            paras: id,
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async multiGet(table, id, _dataSource) {
        let url = this.host + ':' + this.port;
        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'multiGet',
            paras: id,
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async toOne(table, where, field, result, _dataSource) {
        let url = this.host + ':' + this.port;

        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'toOne',
            where,
            paras: field,
            result
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async toMany(table, where, field, result, _dataSource) {
        let url = this.host + ':' + this.port;

        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'toMany',
            where,
            paras: field,
            result
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async count(table, where, _dataSource) {

        let url = this.host + ':' + this.port;

        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'count',
            where
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }

    async sum(table, field, where, _dataSource) {
        let url = this.host + ':' + this.port;

        let data = {
            dataSource: _dataSource || this.dataSource,
            table,
            method: 'sum',
            where,
            paras: field
        };
        try {
            let res = await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
            if (res.code === "OK")
                return res.data;
            return res;
        } catch (e) {
            console.error('==DB Handler Error!==', e);
            return null;
        }
    }
};