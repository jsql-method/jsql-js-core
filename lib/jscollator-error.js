"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JscollatorError = void 0;
/**
 * Contains errors from API
 */
class JscollatorError {
    constructor(axiosError) {
        this._axiosError = axiosError;
    }
    get axiosError() {
        return this._axiosError;
    }
    set axiosError(value) {
        this._axiosError = value;
    }
}
exports.JscollatorError = JscollatorError;
//# sourceMappingURL=jscollator-error.js.map