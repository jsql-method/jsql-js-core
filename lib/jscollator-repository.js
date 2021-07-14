"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JscollatorRepository = void 0;
const jscollator_query_builder_1 = require("./jscollator-query-builder");
const utils_1 = require("./utils");
/**
 * Queries repository.
 */
class JscollatorRepository {
    constructor() {
        this._queries = new Map();
    }
    /**
     * Saves query with given name. Multiple types allowed as query.
     * @param queryName
     * @param query
     */
    set(queryName, query) {
        if (this._queries.has(queryName)) {
            utils_1.Utils.warn(`Named query ${queryName} already exists in repository`);
        }
        this._queries.set(queryName, query);
    }
    /**
     * Finds query by name and returns QueryBuilderResult from query based on its type.
     * @param queryName
     * @param params
     */
    get(queryName, params) {
        if (!this._queries.has(queryName)) {
            utils_1.Utils.error(`Named query ${queryName} does not exists in repository`);
        }
        let query = this._queries.get(queryName);
        if (query instanceof jscollator_query_builder_1.JscollatorQueryBuilder) {
            return query.build();
        }
        else if (query instanceof jscollator_query_builder_1.QueryBuilderResult) {
            return query;
        }
        else if (utils_1.Utils.isFunction(query)) {
            return query(params);
        }
        return jscollator_query_builder_1.JscollatorQueryBuilder.of(query);
    }
}
exports.JscollatorRepository = JscollatorRepository;
//# sourceMappingURL=jscollator-repository.js.map