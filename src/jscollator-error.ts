import {AxiosError} from "axios";

export class JscollatorError {

    private _axiosError: AxiosError;

    get axiosError(): AxiosError {
        return this._axiosError;
    }

    set axiosError(value: AxiosError) {
        this._axiosError = value;
    }

    constructor(axiosError: AxiosError) {
        this._axiosError = axiosError;
    }

}
