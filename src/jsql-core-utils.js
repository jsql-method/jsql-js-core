/*
 * jsql-core
 *
 * Copyright (c) 2018 JSQL
 * Licensed under the ISC license.
 */

JSQL.prototype.isFunction = function (obj) {
    return typeof obj === 'function' || false;
};

JSQL.prototype.throw = function (error) {

    if (!this.hideErrors) {
        throw new Error(error);
    }

};

JSQL.prototype.each = function (obj, iterator) {

    for (var prop in obj) {

        if (obj.hasOwnProperty(prop)) {
            iterator(prop, obj[prop]);
        }

    }

};

JSQL.prototype.isEmptyObject = function (obj) {

    var isEmpty = true;
    for (var prop in obj) {

        if (obj.hasOwnProperty(prop)) {

            if (obj[prop] !== undefined) {
                isEmpty = false;
                break;
            }

        }

    }

    return isEmpty;

};

JSQL.prototype.isArray = function (obj) {

    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(obj) === '[object Array]';
    } else {
        return Array.isArray(obj);
    }

};