import {JscollatorConfig} from "./jscollator-config";
import {JscollatorBuilder, JscollatorBuilderConfig} from "./jscollator-builder";
import {JscollatorQuery} from "./jscollator-query";
import {QueryType} from "./query-type";
import {JscollatorTransaction} from "./jscollator-transaction";

export class Jscollator {

    private readonly _config: JscollatorConfig;

    constructor(config: JscollatorConfig) {
        this._config = config;
    }

    get config(): JscollatorConfig {
        return this._config;
    }

    public select<T>(query: JscollatorQuery): JscollatorBuilder<T> {
        return this.performOperation(query, QueryType.SELECT);
    }

    public selectOne<T>(query: JscollatorQuery): JscollatorBuilder<T> {
        return this.performOperation(query, QueryType.SELECT_ONE);
    }

    public update<T>(query: JscollatorQuery): JscollatorBuilder<T> {
        return this.performOperation(query, QueryType.UPDATE);
    }

    public insert<T>(query: JscollatorQuery): JscollatorBuilder<T> {
        return this.performOperation(query, QueryType.INSERT);
    }

    public delete<T>(query: JscollatorQuery): JscollatorBuilder<T> {
        return this.performOperation(query, QueryType.DELETE);
    }

    public transaction(): JscollatorTransaction {
        return new JscollatorTransaction(this);
    }

    private performOperation<T>(query: JscollatorQuery, queryType: QueryType): JscollatorBuilder<T> {

        return new JscollatorBuilder(
            JscollatorBuilderConfig.builder()
                .setJscollator(this)
                .setQuery(query)
                .setQueryType(queryType)
        );

    }

}
