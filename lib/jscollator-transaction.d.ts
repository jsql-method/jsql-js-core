import { JscollatorBuilder } from "./jscollator-builder";
import { Jscollator } from "./jscollator";
import { JscollatorQuery } from "./jscollator-query";
import { JscollatorError } from "./jscollator-error";
export declare class JscollatorTransaction {
    private readonly transactionId;
    private jscollator;
    constructor(jscollator: Jscollator);
    select<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    selectOne<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    update<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    insert<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    delete<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    commit(): Promise<JscollatorTransactionResponse | JscollatorError>;
    rollback(): Promise<JscollatorTransactionResponse | JscollatorError>;
    private performOperation;
}
export interface JscollatorTransactionResponse {
    success: boolean;
    message?: string;
}
