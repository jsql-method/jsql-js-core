import {AxiosRequestConfig} from "axios";

/**
 * Configuration pojo
 */
export interface JscollatorConfig {
    url: string; //ex. https://provider.jsql.it/api/jsql
    requestConfig?: AxiosRequestConfig;
}
