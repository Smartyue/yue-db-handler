/**
 * Created by yuanjianxin on 2018/3/13.
 */
const HttpUtil = require('yue-http-util');

const method = 'post';

let defaultHeaders = null;

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

        if (!host.startsWith('http://') || !host.startsWith('https://'))
            throw new Error(`Invalid host:${host},should startsWith http:// or https://`);

        this.host = host;
        this.port = port;
        this.project = project;
        this.isConfig = true;
    }

    async get(table, paras, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
            table,
            method: 'get',
            paras
        };
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
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
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
    }

    async list(table, where, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
            table,
            method: 'list',
            where
        };
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
    }

    async save(table, paras, id = null, where = 'id', _project) {
        let url = this.host + ':' + this.port;
        id && (paras[where] = id);
        let data = {
            project: _project || this.project,
            table,
            method: 'save',
            where,
            paras
        };
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
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
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
    }

    async delete(table, id, _project) {

        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
            table,
            method: 'delete',
            paras: id,
        };
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
    }

    async multiGet(table, id, _project) {
        let url = this.host + ':' + this.port;
        let data = {
            project: _project || this.project,
            table,
            method: 'multiGet',
            paras: id,
        };
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
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
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
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
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
    }

    async count(table, where, _project) {

        let url = this.host + ':' + this.port;

        let data = {
            project: _project || this.project,
            table,
            method: 'count',
            where
        };
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
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
        return await HttpUtil.instance.sendRequest(method, url, data, defaultHeaders);
    }
}