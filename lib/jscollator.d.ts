import { JscollatorConfig } from "./jscollator-config";
import { JscollatorBuilder } from "./jscollator-builder";
import { JscollatorQuery } from "./jscollator-query";
import { JscollatorTransaction } from "./jscollator-transaction";
export declare class Jscollator {
    private readonly _config;
    constructor(config: JscollatorConfig);
    get config(): JscollatorConfig;
    select<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    selectOne<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    update<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    insert<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    delete<T>(query: JscollatorQuery): JscollatorBuilder<T>;
    transaction(): JscollatorTransaction;
    private performOperation;
}
