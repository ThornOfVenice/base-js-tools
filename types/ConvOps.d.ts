export interface TransformationRule {
    s?: string;
    f?: (inp: any) => any;
    DEL?: boolean;
    t?: string;
    c?: any;
}
export declare type TransformationRules = Array<TransformationRule>;
export declare class ConvOps {
    static transformRecord(inputRecord: Record<string, any>, transformationRules: TransformationRules): Record<string, any>;
    static arrayToRecord<I, O>(inputArray: Array<I>, keyPath: string, transformationRules?: TransformationRules): Record<string, O>;
    static recordsToRecords<T>(inputRecords: Record<string, Record<string, any>>, transformationRules: TransformationRules): Record<string, any>;
}
