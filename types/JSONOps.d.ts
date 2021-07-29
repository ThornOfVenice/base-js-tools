export declare class JSONOps {
    private static _refToPropertyValue;
    static pathArrayFromString(pathValue: string): string[];
    static getPropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>): any;
    static patchPropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>, value: any): Record<string, any>;
    static deletePropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>): Record<string, any>;
}
