import { AxiosRequestConfig } from "axios";
/**
 * Configuration pojo
 */
export interface JscollatorConfig {
    url: string;
    requestConfig?: AxiosRequestConfig;
}
