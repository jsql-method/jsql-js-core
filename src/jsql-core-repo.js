/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
 */


/**
 * Named queries repositories
 */
JSQL.prototype.querySet = {};
JSQL.prototype.repoSet = {};
JSQL.prototype.repo = function (name) {

    if (!name) {
        return this.repoSet;
    }

    var repoSet = {};
    if (name) {

        if (!this.repoSet[name]) {
            this.repoSet[name] = {};
        }

        repoSet = this.repoSet[name];

    }


    var self = this;
    var repoObj = {
        name: name,
        set: function (queryName, sqlQueryFunction) {
            self.set(this.name + '.' + queryName, sqlQueryFunction);
            return this;
        },
        get: function (queryName) {
            var args = self.toArray(arguments);
            args.shift();
            args.unshift(this.name + '.' + queryName);
            return self.get.apply(self, args);
        }
    };

    return Object.assign(repoObj, repoSet);

};

JSQL.prototype.get = function (queryName) {

    var set = this.querySet[queryName] || null;
    if (this.isFunction(set)) {

        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        var out = set.apply(this, args);
        return out.build();

    }

    return set;
};

JSQL.prototype.set = function (queryName, sqlQuery) {
    this.querySet[queryName] = sqlQuery;
    return this;
};

/**
 * Creates independed queries builder structure
 * @param sqlQuery
 * @returns {{setName: string, append: append}}
 */
JSQL.prototype.query = function (sqlQuery) {

    var self = this;

    var setName = 'set_' + Object.keys(this.querySet).length;
    this.querySet[setName] = [sqlQuery];

    return {
        __isStructure: true,
        __setName: setName,
        build: function () {
            return self.querySet[this.__setName];
        },
        append: function (sqlQuery) {
            self.querySet[this.__setName].push(' ' + sqlQuery + ' ');
            return this;
        }
    };

};