/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */

'use strict';

if (window.JSQL) {
    throw new Error('JSQL: Main object conflict');
} else {

    window.JSQL = function (config) {

        this.__version = '2.1.0';
        this.host = null;
        this.path = null;
        this.querySet = {};
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (config) {

            if (config.apiKey) {
                this.headers['Api-Key'] = config.apiKey;
            }

            if (config.devKey) {
                this.headers['Dev-Key'] = config.devKey;
            }

        }

        this.hideErrors = false;
        this.rxjs = false;

        this.setConfig(config);

    }

}

JSQL.prototype.version = function () {
    console.warn('JSQL version: ' + this.__version);
};

JSQL.prototype.setConfig = function (config) {

    if (config === undefined || config === null || Object.keys(config).length === 0) {
        config = {};
    }

    if (config.host === undefined || config.host === null || typeof config.host !== 'string' || config.host.trim().length === 0 || config.host === '') {
        config.host = 'https://provider.jsql.it/';
    }

    if (config.path === undefined || config.path === null || typeof config.path !== 'string' || config.path.trim().length === 0 || config.path === '') {
        config.path = '/api/jsql/';
    }

    if (config.host.endsWith('/') && config.path.startsWith('/')) {
        config.path = config.path.substring(1, config.path.length);
    }

    if (!config.host.endsWith('/') && !config.path.startsWith('/')) {
        config.path = '/' + config.path;
    }

    if (!config.path.endsWith('/')) {
        config.path += '/';
    }

    if (config.hideErrors !== undefined && config.hideErrors !== null) {
        this.hideErrors = config.hideErrors;
    }

    this.host = config.host;
    this.path = config.path;
    this.url = this.host + this.path;
    this.rxjs = config.rxjs === undefined ? false : config.rxjs;

};

/**
 * Function to override - should return promise
 *
 * @param type
 * @param data
 * @param headers
 * @returns {*}
 */
JSQL.prototype.request = function () {
    this.throw('No request implementation');
};

/**
 * Function to override - should return complete promise / subscribe
 * Please create promise with existing function construct()
 *
 * @param token
 * @param type
 */
JSQL.prototype.wrap = function () {
    this.throw('No wrap implementation');
};

JSQL.prototype.construct = function (token, type, options) {

    var _JSQL = this;

    if (token !== null && token !== undefined) {
        if (!this.isArray(token)) {
            if (token.__isStructure) {
                token = token.build();
            }
        }
    }

    var isTransaction = false;

    function prepareForTransaction() {

        isTransaction = true;

        if (!options) {
            options = {headers: {}};
        }

        if (options.headers === undefined || options.headers === null) {
            options.headers = {};
        }

        options.headers['txid'] = token.txid;

        token = token.token;

    }

    if (type === 'rollback' || type === 'commit') {
        prepareForTransaction();
    } else if (token !== null && token !== undefined) {

        if (token.token && token.txid) {
            prepareForTransaction();
        }

    }

    if (isTransaction && type !== 'rollback' && type !== 'commit' && token === undefined || token === null || (typeof token !== 'string' && !this.isArray(token))) {
        this.throw('Unable to execute with unset token');
    } else if (token === undefined || token === null || (typeof token !== 'string' && !this.isArray(token))) {
        this.throw('Unable to execute with unset token');
    }

    var defaultOptions = {
        throwSelectOneError: false,
        ignoreSelectOneMoreResults: (type === 'selectOne' ? true : false),
        headers: {},
        successName: 'success',
        errorName: 'error',
        alwaysName: 'always'
    };

    if (options === undefined || options === null) {
        options = defaultOptions;
    } else {

        for (var option in defaultOptions) {

            if (defaultOptions.hasOwnProperty(option)) {

                if (options[option] === undefined || options[option] === null) {
                    options[option] = defaultOptions[option];
                }

            }

        }

    }

    if (options.headers === undefined || options.headers === null) {
        options.headers = {};
    }

    for (var header in _JSQL.headers) {

        if (_JSQL.headers.hasOwnProperty(header)) {
            if (options.headers[header] === undefined || options.headers[header] === null) {
                options.headers[header] = _JSQL.headers[header];
            }
        }

    }

    token = this.removePrefix(token);

    var promise = {
        xhrPromise: null,
        type: type,
        isUsedParamsArray: false,
        isTransaction: isTransaction,
        headers: options.headers,
        options: options,
        data: {
            token: token,
            params: {}
        },
        querySet: [],
        catchCallback: function () {
        },
        param: function (paramName, paramValue) {

            if (promise.type === 'rollback') {
                _JSQL.throw('Transactions already rollbacked');
                return promise;
            }

            if (promise.type === 'commit') {
                _JSQL.throw('Transaction already commited');
                return promise;
            }

            if (promise.isUsedParamsArray) {
                _JSQL.throw('Cannot mix params array and single params');
                return promise;
            }

            if (paramName !== undefined && paramName !== null && typeof paramName === 'string' && paramValue) {

                if (promise.data.params[paramName] !== undefined) {
                    console.warn('JSQL: Parameter "' + paramName + '" already exist, will be replaced');
                }

                promise.data.params[paramName] = paramValue;

            } else {
                _JSQL.throw('"param" function accept args: [paramName:string, paramValue:primitive]');
            }

            return promise;

        },
        params: function (paramsArrayOrParamsObject) {

            if (promise.type === 'rollback') {
                _JSQL.throw('Transactions already rollbacked');
                return promise;
            }

            if (promise.type === 'commit') {
                _JSQL.throw('Transaction already commited');
                return promise;
            }

            if (_JSQL.isArray(paramsArrayOrParamsObject)) {

                if (!_JSQL.isEmptyObject(promise.data.params)) {
                    _JSQL.throw('Cannot mix params array and object params');
                    return promise;
                }

                promise.isUsedParamsArray = true;

                promise.data.params = paramsArrayOrParamsObject;

            } else {

                _JSQL.each(paramsArrayOrParamsObject, function (paramName, paramValue) {

                    if (promise.data.params[paramName]) {
                        console.warn('JSQL: Parameter "' + paramName + '" already exist, will be replaced');
                    }

                    promise.data.params[paramName] = paramValue;

                });

            }

            return promise;

        },
        successResultCallback: function (result, callBack) {

            if (promise.type === 'commit' || promise.type === 'rollback') {

                if (_JSQL.rxjs) {
                    return result;
                } else {
                    callBack(result);
                }

            } else if (promise.type === 'selectOne' && !promise.options.ignoreSelectOneMoreResults && result.length > 1) {
                promise.options.throwSelectOneError = true;
            } else if (_JSQL.isArray(result)) {

                if (_JSQL.rxjs) {

                    if (promise.type === 'selectOne' && promise.options.ignoreSelectOneMoreResults) {
                        return result.length > 0 ? result[0] : null;
                    }

                    return result;

                } else if (promise.type === 'selectOne' && promise.options.ignoreSelectOneMoreResults) {
                    callBack(result.length > 0 ? result[0] : null);
                } else {
                    callBack(result);
                }

            } else {

                if (_JSQL.rxjs) {

                    if (promise.type === 'selectOne' && promise.options.ignoreSelectOneMoreResults) {

                        var dataProp = _JSQL.getDataProperty(result);
                        if (dataProp != null) {
                            result[dataProp] = result[dataProp].length > 0 ? result[dataProp][0] : null;
                        }

                    }

                    return result;

                } else {

                    if (promise.type === 'selectOne' && promise.options.ignoreSelectOneMoreResults) {

                        var dataProp = _JSQL.getDataProperty(result);
                        if (dataProp != null) {
                            result[dataProp] = result[dataProp].length > 0 ? result[dataProp][0] : null;
                        }

                    }

                    callBack(result);
                }

            }

        },
        ok: function () {

            if (!_JSQL.rxjs) {
                promise.then(function () {
                });
            }

        },
        then: function (callBack) {

            promise.checkAndCreateXhrPromise();
            promise.createAlways();

            promise.xhrPromise[promise.options.successName](function (result) {
                promise.successResultCallback(result, callBack);
            });

            return promise;

        },
        thenRxjs: function (result) {
            return promise.successResultCallback(result);
        },
        catch: function (callBack) {

            promise.checkAndCreateXhrPromise();
            promise.createAlways();

            promise.xhrPromise[promise.options.errorName](function (error) {
                callBack(error);
            });

            promise.catchCallback = callBack;

            return promise;

        },
        catchRxjs: function (error) {
            return error;
        },
        createAlways: function () {

            if (!promise.xhrPromise[promise.options.alwaysName]) {
                promise.xhrPromise[promise.options.alwaysName] = function () {

                    if (promise.options.throwSelectOneError) {
                        promise.catchCallback("JSQL: More than one result not allowed with selectOne");
                    }

                }
            }

        },
        checkAndCreateXhrPromise: function () {

            if (!promise.xhrPromise) {
                promise.xhrPromise = _JSQL.request(_JSQL.url + (promise.type === 'selectOne' ? 'select' : promise.type), promise.data, promise.headers, promise);
            }

        }
    };

    return promise;

};

/**
 * Set of operations functions
 * @param token
 */
JSQL.prototype.select = function (token) {
    return this.wrap(token, 'select', this);
};

JSQL.prototype.selectOne = function (token) {
    return this.wrap(token, 'selectOne', this);
};

JSQL.prototype.update = function (token) {
    return this.wrap(token, 'update', this);
};

JSQL.prototype.insert = function (token) {
    return this.wrap(token, 'insert', this);
};

JSQL.prototype.remove = function (token) {
    return this.wrap(token, 'delete', this);
};

JSQL.prototype.delete = function (token) {
    return this.wrap(token, 'delete', this);
};