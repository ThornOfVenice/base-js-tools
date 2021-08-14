export declare class ConvOps {
    static arrayToRecord<T>(inputArray: Array<T>, keyPath: string): Record<string, T>;
    static transformRecord(inputRecord: Record<string, any>, transformationRules: Array<{
        s?: string;
        f?: (inp: any) => any;
        DEL?: boolean;
        t?: string;
        c?: any;
    }>): Record<string, any>;
}
