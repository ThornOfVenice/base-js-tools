export declare class JSONOps {
    private static _refToPropertyValue;
    static pathStringSplit(pathString: string): string[];
    static pathArrayFromString(pathValue: string): (string | number)[];
    static getPropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>): any;
    static patchPropertyValue(containerData: Record<string, any>, keyPath: Array<string | number>, value: any): Record<string, any>;
    static deleteProperty(containerData: Record<string, any>, keyPath: Array<string | number>): Record<string, any>;
    static modifyProperty(containerData: Record<string, any>, keyPathString: string, actionDescriptor: "delete" | "modify", value?: any): Record<string, any>;
}
//# sourceMappingURL=JSONOps.d.ts.map