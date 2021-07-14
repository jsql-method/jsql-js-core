import { JscollatorQueryBuilder, QueryBuilderResult } from "./jscollator-query-builder";
declare type ParamsCallback = (params: Record<string, any>) => QueryBuilderResult;
declare type PossibleQueryType = QueryBuilderResult | JscollatorQueryBuilder | string | ParamsCallback;
/**
 * Queries repository.
 */
export declare class JscollatorRepository {
    private _queries;
    /**
     * Saves query with given name. Multiple types allowed as query.
     * @param queryName
     * @param query
     */
    set(queryName: string, query: PossibleQueryType): void;
    /**
     * Finds query by name and returns QueryBuilderResult from query based on its type.
     * @param queryName
     * @param params
     */
    get(queryName: string, params?: Record<string, any>): QueryBuilderResult;
}
export {};
