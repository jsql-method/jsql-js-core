import { AxiosError } from "axios";
/**
 * Contains errors from API
 */
export declare class JscollatorError {
    private _axiosError;
    get axiosError(): AxiosError;
    set axiosError(value: AxiosError);
    constructor(axiosError: AxiosError);
}
