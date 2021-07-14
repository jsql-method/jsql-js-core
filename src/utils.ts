export class Utils {

    /**
     * Checks if provided object is function
     * @param obj
     */
    public static isFunction(obj: any): boolean {
        const AsyncFunction = (async () => {}).constructor;
        return obj && obj instanceof Function || obj instanceof AsyncFunction;
    };

    /**
     * Prints warn on the console
     * @param message
     */
    public static warn(message: string): void {
        console.warn(`Jscollator warning: ${message}`);
    }

    /**
     * Throws
     * @param message
     */
    public static error(message: string): void {
        throw Error(`Jscollator error: ${message}`);
    }

}
