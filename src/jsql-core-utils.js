/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */


JSQL.prototype.isFunction = function (obj) {
    return typeof obj === 'function' || false;
};

JSQL.prototype.throw = function (error) {

    if (!this.hideErrors) {
        throw new Error('JSQL Core error: '+error);
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

JSQL.prototype.toArray = function(arrayLike){

    var arr = [];
    for(var i = 0; i < arrayLike.length; i++){
        arr[i] = arrayLike[i];
    }

    return arr;

};

JSQL.prototype.getDataProperty = function(result){

    if(result.data){
        return 'data';
    }

    if(result.body){
        return 'body';
    }

    return null;

};

JSQL.prototype.removePrefix = function(token){

    var toRpl = {
        a: '@',
        b: 'sql',
        c: function(){
            return this.a + this.b;
        }
    };

    if(this.isArray(token)){

        for(var i = 0; i < token.length; i++){
            token[i] = token[i].replace(toRpl.c(),'').trim();
        }

        return token;

    }else{
        return token.replace(toRpl.c(),'').trim();
    }

}