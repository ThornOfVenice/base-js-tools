export declare class JSONOps {
    private static _refToPropertyValue;
    static getPropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>): Record<string, any>;
    static patchPropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>, value: any): Record<string, any>;
    static deletePropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>): Record<string, any>;
}
