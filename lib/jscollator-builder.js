"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JscollatorBuilderConfig = exports.JscollatorBuilder = void 0;
const jscollator_query_builder_1 = require("./jscollator-query-builder");
const jscollator_error_1 = require("./jscollator-error");
const axios_1 = require("axios");
class JscollatorBuilder {
    constructor(jscollatorBuilderConfig) {
        this._queryParams = {};
        this.jscollatorBuilderConfig = jscollatorBuilderConfig;
        this.prepareTransaction();
    }
    prepareTransaction() {
        if (this.jscollatorBuilderConfig.getIsTransaction()) {
            this.jscollatorBuilderConfig.getHeaders().set(JscollatorBuilderConfig.transactionHeader, this.jscollatorBuilderConfig.getTransactionId());
        }
    }
    param(paramName, paramValue) {
        this._queryParams[paramName] = paramValue;
        return this;
    }
    params(params) {
        for (let paramName in params) {
            if (params.hasOwnProperty(paramName)) {
                this.param(paramName, params[paramName]);
            }
        }
        return this;
    }
    getRequestConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            let requestConfig = this.jscollatorBuilderConfig.getJscollator().config.requestConfig || {};
            if (requestConfig.headers) {
                requestConfig.headers = new Map([requestConfig.headers, this.jscollatorBuilderConfig.getHeaders()]);
            }
            else {
                requestConfig.headers = this.jscollatorBuilderConfig.getHeaders();
            }
            return requestConfig;
        });
    }
    static handleError(axiosError) {
        return __awaiter(this, void 0, void 0, function* () {
            return new jscollator_error_1.JscollatorError(axiosError);
        });
    }
    getRequest() {
        return {
            queryType: this.jscollatorBuilderConfig.getQueryType(),
            transactionId: this.jscollatorBuilderConfig.getTransactionId(),
            query: this.prepareQuery(),
            params: this._queryParams
        };
    }
    prepareQuery() {
        if (this.jscollatorBuilderConfig.getQuery() === null) {
            return null;
        }
        let concatenatedQuery = '';
        for (let query of this.jscollatorBuilderConfig.getQuery().queries) {
            concatenatedQuery += `+${query}`;
        }
        return concatenatedQuery.substring(1, concatenatedQuery.length);
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = this.getRequest();
            console.log('request', request);
            try {
                let response = yield axios_1.default.post(this.jscollatorBuilderConfig.getJscollator().config.url, request, yield this.getRequestConfig());
                return response.data;
            }
            catch (error) {
                return yield JscollatorBuilder.handleError(error);
            }
        });
    }
}
exports.JscollatorBuilder = JscollatorBuilder;
class JscollatorBuilderConfig {
    constructor() {
        this._isTransaction = false;
        this._headers = new Map([
            ['Content-Type', 'application/json']
        ]);
        this._jscollator = null;
        this._queryType = null;
        this._query = null;
        this._transactionId = null;
    }
    static builder() {
        return new JscollatorBuilderConfig();
    }
    getIsTransaction() {
        return this._isTransaction;
    }
    setHeaders(value) {
        this._headers = value;
        return this;
    }
    getHeaders() {
        return this._headers;
    }
    setJscollator(value) {
        this._jscollator = value;
        return this;
    }
    getJscollator() {
        return this._jscollator;
    }
    setQueryType(value) {
        this._queryType = value;
        return this;
    }
    getQueryType() {
        return this._queryType;
    }
    setQuery(value) {
        if (value === null) {
            this._query = null;
        }
        else if (!(value instanceof jscollator_query_builder_1.QueryBuilderResult)) {
            this._query = jscollator_query_builder_1.JscollatorQueryBuilder.of(value);
        }
        else {
            this._query = value;
        }
        return this;
    }
    getQuery() {
        return this._query;
    }
    setTransactionId(value) {
        this._transactionId = value;
        this._isTransaction = true;
        return this;
    }
    getTransactionId() {
        return this._transactionId;
    }
}
exports.JscollatorBuilderConfig = JscollatorBuilderConfig;
JscollatorBuilderConfig.transactionHeader = 'jscollator_txid';
//# sourceMappingURL=jscollator-builder.js.map