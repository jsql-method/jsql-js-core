import { QueryType } from "./query-type";
export interface JscollateRequest {
    queryType: QueryType;
    transactionId: string;
    query: string;
    params: Record<string, any>;
}
