import { QueryBuilderResult } from "./jscollator-query-builder";
import { Jscollator } from "./jscollator";
import { JscollatorQuery } from "./jscollator-query";
import { QueryType } from "./query-type";
import { JscollatorError } from "./jscollator-error";
export declare class JscollatorBuilder<T> {
    private jscollatorBuilderConfig;
    constructor(jscollatorBuilderConfig: JscollatorBuilderConfig);
    private prepareTransaction;
    private _queryParams;
    param(paramName: string, paramValue: any): JscollatorBuilder<T>;
    params(params: Record<string, any>): JscollatorBuilder<T>;
    private getRequestConfig;
    private static handleError;
    private getRequest;
    private prepareQuery;
    perform(): Promise<T | JscollatorError>;
}
export declare class JscollatorBuilderConfig {
    static transactionHeader: string;
    private _isTransaction;
    private _headers;
    private _jscollator;
    private _queryType;
    private _query;
    private _transactionId;
    static builder(): JscollatorBuilderConfig;
    getIsTransaction(): boolean;
    setHeaders(value: Map<string, string>): JscollatorBuilderConfig;
    getHeaders(): Map<string, string>;
    setJscollator(value: Jscollator): JscollatorBuilderConfig;
    getJscollator(): Jscollator;
    setQueryType(value: QueryType): JscollatorBuilderConfig;
    getQueryType(): QueryType;
    setQuery(value: JscollatorQuery): JscollatorBuilderConfig;
    getQuery(): QueryBuilderResult;
    setTransactionId(value: string): JscollatorBuilderConfig;
    getTransactionId(): string;
}
