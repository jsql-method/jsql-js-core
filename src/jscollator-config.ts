import {AxiosRequestConfig} from "axios";

export interface JscollatorConfig {
    url: string; //ex. https://provider.jsql.it/api/jsql
    requestConfig?: AxiosRequestConfig;
}
