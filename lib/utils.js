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
exports.Utils = void 0;
class Utils {
    /**
     * Checks if provided object is function
     * @param obj
     */
    static isFunction(obj) {
        const AsyncFunction = (() => __awaiter(this, void 0, void 0, function* () { })).constructor;
        return obj && obj instanceof Function || obj instanceof AsyncFunction;
    }
    ;
    /**
     * Prints warn on the console
     * @param message
     */
    static warn(message) {
        console.warn(`Jscollator warning: ${message}`);
    }
    /**
     * Throws
     * @param message
     */
    static error(message) {
        throw Error(`Jscollator error: ${message}`);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map