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
        this.project = null;
        this.isConfig = false;
    }

    config({host, port, project}) {
        if (this.isConfig)
            return undefined;
        if (!host) throw new Error(`==DBService host need config!==`);
        if (!port) throw new Error(`==DBService port need config!==`);
        if (!project) throw new Error(`==DBService project need config!==`);

        if (!host.startsWith('http://') && !host.startsWith('https://'))
            throw new Error(`Invalid host:${host},should startsWith http:// or https://`);

        this.host = host;
        this.port = port;
        this.project = project;
        this.isConfig = true;


        // alias
        this.findById = this.get;
        this.findOne = this.getOne;
        this.findAll = this.list;
        this.create = this.save;

    }

    async get(table, paras, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
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


    async getOne(table, field, paras, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
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

    async list(table, where, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
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

    async save(table, paras, where = 'id', _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
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

    async update(table, where, paras, _project = null) {

        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
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

    async delete(table, id, _project) {

        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
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

    async multiGet(table, id, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
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

    async toOne(table, where, field, result, _project) {
        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
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

    async toMany(table, where, field, result, _project) {
        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
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

    async count(table, where, _project) {

        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
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

    async sum(table, field, where, _project) {
        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
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