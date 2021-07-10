
JSQL.prototype.construct = function (token, type, options) {

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

            if (Array.isArray(paramsArrayOrParamsObject)) {

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
            } else if (Array.isArray(result)) {

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
