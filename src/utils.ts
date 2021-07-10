export class Utils {

    public static isFunction(obj: any): boolean {
        const AsyncFunction = (async () => {
        }).constructor;
        return obj && obj instanceof Function || obj instanceof AsyncFunction;
    };

    public static throw(error: string): void {
        throw new Error('Jscollator error: ' + error);
    };

    public static isEmptyObject(obj: Record<any, any>): boolean {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object
    };

    // public static toArray(arrayLike) {
    //
    //     let arr = [];
    //     for (let i = 0; i < arrayLike.length; i++) {
    //         arr[i] = arrayLike[i];
    //     }
    //
    //     return arr;
    //
    // };

    public static getDataProperty(result) {

        if (result.data) {
            return 'data';
        }

        if (result.body) {
            return 'body';
        }

        return null;

    };





    public static warn(message: string): void {
        console.warn(`Jscollator warning: ${message}`);
    }

    public static error(message: string): void {
        throw Error(`Jscollator error: ${message}`);
    }
}
