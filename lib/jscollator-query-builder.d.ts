/**
 * Query builder. ex. usage
 * QueryBuilder.of("select * from person");
 * QueryBuilder.query("select * from person").append("where id = :id").build();
 * new QueryBuilder().
 */
export declare class JscollatorQueryBuilder {
    /**
     * Prefix from queries to be removed before sent to backend
     * @private
     */
    private static tokenPrefix;
    /**
     * Storage for SQL queries
     * @private
     */
    private _queries;
    /**
     * Creates single query
     * @param query
     */
    static of(query: string): QueryBuilderResult;
    /**
     * Initializes query builder
     * @param query
     */
    static query(query: string): JscollatorQueryBuilder;
    /**
     * Appends additional queries
     * @param query
     */
    append(query: string): JscollatorQueryBuilder;
    /**
     * Produces result for further usage
     */
    build(): QueryBuilderResult;
    /**
     * Removes indication prefixes from queries
     * @param tokens
     * @private
     */
    private static removePrefixes;
}
/**
 * Stores QueryBuilder result
 */
export declare class QueryBuilderResult {
    private readonly _queries;
    constructor(queries: Array<string>);
    get queries(): Array<string>;
}
