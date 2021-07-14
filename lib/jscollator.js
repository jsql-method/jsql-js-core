"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jscollator = void 0;
const jscollator_builder_1 = require("./jscollator-builder");
const query_type_1 = require("./query-type");
const jscollator_transaction_1 = require("./jscollator-transaction");
class Jscollator {
    constructor(config) {
        this._config = config;
    }
    get config() {
        return this._config;
    }
    select(query) {
        return this.performOperation(query, query_type_1.QueryType.SELECT);
    }
    selectOne(query) {
        return this.performOperation(query, query_type_1.QueryType.SELECT_ONE);
    }
    update(query) {
        return this.performOperation(query, query_type_1.QueryType.UPDATE);
    }
    insert(query) {
        return this.performOperation(query, query_type_1.QueryType.INSERT);
    }
    delete(query) {
        return this.performOperation(query, query_type_1.QueryType.DELETE);
    }
    transaction() {
        return new jscollator_transaction_1.JscollatorTransaction(this);
    }
    performOperation(query, queryType) {
        return new jscollator_builder_1.JscollatorBuilder(jscollator_builder_1.JscollatorBuilderConfig.builder()
            .setJscollator(this)
            .setQuery(query)
            .setQueryType(queryType));
    }
}
exports.Jscollator = Jscollator;
//# sourceMappingURL=jscollator.js.map