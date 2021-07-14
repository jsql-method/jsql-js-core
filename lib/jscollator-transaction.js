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
exports.JscollatorTransaction = void 0;
const uuid_1 = require("uuid");
const jscollator_builder_1 = require("./jscollator-builder");
const query_type_1 = require("./query-type");
class JscollatorTransaction {
    constructor(jscollator) {
        this.jscollator = jscollator;
        this.transactionId = uuid_1.v4();
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
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.performOperation(null, query_type_1.QueryType.COMMIT).perform();
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.performOperation(null, query_type_1.QueryType.ROLLBACK).perform();
        });
    }
    performOperation(query, queryType) {
        console.log('performOperation', query);
        return new jscollator_builder_1.JscollatorBuilder(jscollator_builder_1.JscollatorBuilderConfig.builder()
            .setJscollator(this.jscollator)
            .setQuery(query)
            .setQueryType(queryType)
            .setTransactionId(this.transactionId));
    }
}
exports.JscollatorTransaction = JscollatorTransaction;
//# sourceMappingURL=jscollator-transaction.js.map