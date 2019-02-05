/*
 * jsql-core
 *
 * Copyright (c) 2018 JSQL
 * Licensed under the ISC license.
 */

JSQL.prototype.txid = function(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text + '_' + new Date().getTime();
};

JSQL.prototype.tx = function () {

    var self = this;

    var jsqlTx = {
        __txid: self.txid(),
        select: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'select', self);
        },
        selectOne: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'selectOne', self);
        },
        update: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'update', self);
        },
        insert: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'insert', self);
        },
        remove: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'delete', self);
        },
        delete: function (token) {
            return self.wrap({token: token, txid: jsqlTx.__txid}, 'delete', self);
        },
        commit: function(){
            return self.wrap({token: '', txid: jsqlTx.__txid}, 'commit', self);
        },
        rollback: function(){
            return self.wrap({token: '', txid: jsqlTx.__txid}, 'rollback', self);
        }
    };

    return jsqlTx;

};
