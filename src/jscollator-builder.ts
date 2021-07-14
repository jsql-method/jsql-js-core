import {JscollatorQueryBuilder, QueryBuilderResult} from "./jscollator-query-builder";
import {Jscollator} from "./jscollator";
import {JscollatorQuery} from "./jscollator-query";
import {QueryType} from "./query-type";
import {JscollatorError} from "./jscollator-error";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {JscollateRequest} from "./jscollator-request";

export class JscollatorBuilder<T> {

    private jscollatorBuilderConfig: JscollatorBuilderConfig;

    constructor(jscollatorBuilderConfig: JscollatorBuilderConfig) {
        this.jscollatorBuilderConfig = jscollatorBuilderConfig;
        this.prepareTransaction();
    }

    private prepareTransaction() {

        if (this.jscollatorBuilderConfig.getIsTransaction()) {
            this.jscollatorBuilderConfig.getHeaders().set(JscollatorBuilderConfig.transactionHeader, this.jscollatorBuilderConfig.getTransactionId());
        }

    }

    private _queryParams: Record<string, any> = {};

    public param(paramName: string, paramValue: any): JscollatorBuilder<T> {
        this._queryParams[paramName] = paramValue;
        return this;
    }

    public params(params: Record<string, any>): JscollatorBuilder<T> {

        for (let paramName in params) {
            if (params.hasOwnProperty(paramName)) {
                this.param(paramName, params[paramName]);
            }
        }

        return this;
    }

    private async getRequestConfig(): Promise<AxiosRequestConfig> {

        let requestConfig: AxiosRequestConfig = this.jscollatorBuilderConfig.getJscollator().config.requestConfig || {};

        if (requestConfig.headers) {
            requestConfig.headers = new Map([requestConfig.headers, this.jscollatorBuilderConfig.getHeaders()]);
        } else {
            requestConfig.headers = this.jscollatorBuilderConfig.getHeaders();
        }

        return requestConfig;

    }

    private static async handleError(axiosError: AxiosError): Promise<JscollatorError> {
        return new JscollatorError(axiosError);
    }

    private getRequest(): JscollateRequest {

        return {
            queryType: this.jscollatorBuilderConfig.getQueryType(),
            transactionId: this.jscollatorBuilderConfig.getTransactionId(),
            query: this.prepareQuery(),
            params: this._queryParams
        }

    }

    private prepareQuery(): string {

        if (this.jscollatorBuilderConfig.getQuery() === null) {
            return null;
        }

        let concatenatedQuery: string = '';

        for (let query of this.jscollatorBuilderConfig.getQuery().queries) {
            concatenatedQuery += `+${query}`
        }

        return concatenatedQuery.substring(1, concatenatedQuery.length);

    }

    public async perform(): Promise<T | JscollatorError> {

        let request: JscollateRequest = this.getRequest();

        console.log('request', request);

        try {
            let response: AxiosResponse = await axios.post(this.jscollatorBuilderConfig.getJscollator().config.url, request, await this.getRequestConfig());
            return <T>response.data;
        } catch (error) {
            return await JscollatorBuilder.handleError(error);
        }

    }

}

export class JscollatorBuilderConfig {

    public static transactionHeader: string = 'jscollator_txid';
    private _isTransaction: boolean = false;
    private _headers: Map<string, string> = new Map([
        ['Content-Type', 'application/json']
    ]);
    private _jscollator: Jscollator = null;
    private _queryType: QueryType = null;
    private _query: QueryBuilderResult = null;
    private _transactionId: string = null;

    public static builder(): JscollatorBuilderConfig {
        return new JscollatorBuilderConfig();
    }

    public getIsTransaction(): boolean {
        return this._isTransaction;
    }

    public setHeaders(value: Map<string, string>): JscollatorBuilderConfig {
        this._headers = value;
        return this;
    }

    public getHeaders(): Map<string, string> {
        return this._headers;
    }

    public setJscollator(value: Jscollator): JscollatorBuilderConfig {
        this._jscollator = value;
        return this;
    }

    public getJscollator(): Jscollator {
        return this._jscollator;
    }

    public setQueryType(value: QueryType): JscollatorBuilderConfig {
        this._queryType = value;
        return this;
    }

    public getQueryType(): QueryType {
        return this._queryType;
    }

    public setQuery(value: JscollatorQuery): JscollatorBuilderConfig {

        if (value === null) {
            this._query = null;
        } else if (!(value instanceof QueryBuilderResult)) {
            this._query = JscollatorQueryBuilder.of(<string>value);
        } else {
            this._query = <QueryBuilderResult>value;
        }

        return this;

    }

    public getQuery(): QueryBuilderResult {
        return this._query as QueryBuilderResult;
    }

    public setTransactionId(value: string): JscollatorBuilderConfig {
        this._transactionId = value;
        this._isTransaction = true;
        return this;
    }

    public getTransactionId(): string {
        return this._transactionId;
    }

}
