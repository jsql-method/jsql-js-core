import {v4 as uuidv4} from 'uuid';
import {JscollatorBuilder, JscollatorBuilderConfig} from "./jscollator-builder";
import {Jscollator} from "./jscollator";
import {JscollatorQuery} from "./jscollator-query";
import {QueryType} from "./query-type";
import {JscollatorError} from "./jscollator-error";

export class JscollatorTransaction {

    private readonly transactionId: string;
    private jscollator: Jscollator;

    constructor(jscollator: Jscollator) {
        this.jscollator = jscollator;
        this.transactionId = uuidv4();
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

    public async commit(): Promise<JscollatorTransactionResponse | JscollatorError> {
        return this.performOperation<JscollatorTransactionResponse | JscollatorError>(null, QueryType.COMMIT).perform();
    }

    public async rollback(): Promise<JscollatorTransactionResponse | JscollatorError>{
        return this.performOperation<JscollatorTransactionResponse | JscollatorError>(null, QueryType.ROLLBACK).perform();
    }

    private performOperation<T>(query: JscollatorQuery, queryType: QueryType) : JscollatorBuilder<T> {

        console.log('performOperation', query);

        return new JscollatorBuilder(
            JscollatorBuilderConfig.builder()
                .setJscollator(this.jscollator)
                .setQuery(query)
                .setQueryType(queryType)
                .setTransactionId(this.transactionId)
        );

    }

}

export interface JscollatorTransactionResponse {
    success: boolean;
    message?: string;
}
