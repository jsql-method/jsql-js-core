import {JscollatorQueryBuilder, QueryBuilderResult} from "./jscollator-query-builder";
import {Utils} from "./utils";

type ParamsCallback = (params: Record<string, any>) => QueryBuilderResult;
type PossibleQueryType = QueryBuilderResult | JscollatorQueryBuilder | string | ParamsCallback;

/**
 * Queries repository.
 */
export class JscollatorRepository {

    private _queries: Map<string, PossibleQueryType> = new Map();

    /**
     * Saves query with given name. Multiple types allowed as query.
     * @param queryName
     * @param query
     */
    public set(queryName: string, query: PossibleQueryType): void {

        if (this._queries.has(queryName)) {
            Utils.warn(`Named query ${queryName} already exists in repository`);
        }

        this._queries.set(queryName, query);

    }

    /**
     * Finds query by name and returns QueryBuilderResult from query based on its type.
     * @param queryName
     * @param params
     */
    public get(queryName: string, params?: Record<string, any>): QueryBuilderResult {

        if (!this._queries.has(queryName)) {
            Utils.error(`Named query ${queryName} does not exists in repository`);
        }

        let query: PossibleQueryType = this._queries.get(queryName);


        if (query instanceof JscollatorQueryBuilder) {
            return query.build();
        } else if (query instanceof QueryBuilderResult) {
            return query;
        } else if (Utils.isFunction(query)) {
            return (query as ParamsCallback)(params);
        }

        return JscollatorQueryBuilder.of(query as string);

    }

}
