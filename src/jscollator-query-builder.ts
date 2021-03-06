/**
 * Query builder. ex. usage
 * QueryBuilder.of("select * from person");
 * QueryBuilder.query("select * from person").append("where id = :id").build();
 * new QueryBuilder().
 */
export class JscollatorQueryBuilder {

    /**
     * Prefix from queries to be removed before sent to backend
     * @private
     */
    private static tokenPrefix: string = '@sql';

    /**
     * Storage for SQL queries
     * @private
     */
    private _queries: Array<string> = [];

    /**
     * Creates single query
     * @param query
     */
    public static of(query: string): QueryBuilderResult {
        return JscollatorQueryBuilder.query(query).build();
    }

    /**
     * Initializes query builder
     * @param query
     */
    public static query(query: string): JscollatorQueryBuilder {
        return new JscollatorQueryBuilder().append(query);
    }

    /**
     * Appends additional queries
     * @param query
     */
    public append(query: string): JscollatorQueryBuilder {
        return this._queries.push(` ${query} `) && this;
    }

    /**
     * Produces result for further usage
     */
    public build(): QueryBuilderResult {
        return new QueryBuilderResult(JscollatorQueryBuilder.removePrefixes(this._queries));
    }

    /**
     * Removes indication prefixes from queries
     * @param tokens
     * @private
     */
    private static removePrefixes(tokens: Array<string>) {

        let replacePrefix = (token: string) => {
            return token.replace(this.tokenPrefix, '').trim();
        }

        return tokens.map(replacePrefix);

    }

}

/**
 * Stores QueryBuilder result
 */
export class QueryBuilderResult {

    private readonly _queries: Array<string>;

    constructor(queries: Array<string>) {
        this._queries = queries;
    }

    get queries(): Array<string> {
        return this._queries;
    }

}
