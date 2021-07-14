"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderResult = exports.JscollatorQueryBuilder = void 0;
/**
 * Query builder. ex. usage
 * QueryBuilder.of("select * from person");
 * QueryBuilder.query("select * from person").append("where id = :id").build();
 * new QueryBuilder().
 */
class JscollatorQueryBuilder {
    constructor() {
        /**
         * Storage for SQL queries
         * @private
         */
        this._queries = [];
    }
    /**
     * Creates single query
     * @param query
     */
    static of(query) {
        return JscollatorQueryBuilder.query(query).build();
    }
    /**
     * Initializes query builder
     * @param query
     */
    static query(query) {
        return new JscollatorQueryBuilder().append(query);
    }
    /**
     * Appends additional queries
     * @param query
     */
    append(query) {
        return this._queries.push(` ${query} `) && this;
    }
    /**
     * Produces result for further usage
     */
    build() {
        return new QueryBuilderResult(JscollatorQueryBuilder.removePrefixes(this._queries));
    }
    /**
     * Removes indication prefixes from queries
     * @param tokens
     * @private
     */
    static removePrefixes(tokens) {
        let replacePrefix = (token) => {
            return token.replace(this.tokenPrefix, '').trim();
        };
        return tokens.map(replacePrefix);
    }
}
exports.JscollatorQueryBuilder = JscollatorQueryBuilder;
/**
 * Prefix from queries to be removed before sent to backend
 * @private
 */
JscollatorQueryBuilder.tokenPrefix = '@sql';
/**
 * Stores QueryBuilder result
 */
class QueryBuilderResult {
    constructor(queries) {
        this._queries = queries;
    }
    get queries() {
        return this._queries;
    }
}
exports.QueryBuilderResult = QueryBuilderResult;
//# sourceMappingURL=jscollator-query-builder.js.map