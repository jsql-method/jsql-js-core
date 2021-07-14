"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryType = void 0;
var QueryType;
(function (QueryType) {
    QueryType[QueryType["SELECT"] = 0] = "SELECT";
    QueryType[QueryType["SELECT_ONE"] = 1] = "SELECT_ONE";
    QueryType[QueryType["INSERT"] = 2] = "INSERT";
    QueryType[QueryType["UPDATE"] = 3] = "UPDATE";
    QueryType[QueryType["DELETE"] = 4] = "DELETE";
    QueryType[QueryType["COMMIT"] = 5] = "COMMIT";
    QueryType[QueryType["ROLLBACK"] = 6] = "ROLLBACK";
})(QueryType = exports.QueryType || (exports.QueryType = {}));
//# sourceMappingURL=query-type.js.map