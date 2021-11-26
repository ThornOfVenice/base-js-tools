/**
 * The interface which defines a transformation rules.
 * s - source
 * f - function. Value from the source will be provided as an input.
 * DEL - whether to delete the property.
 * t - target
 * c - constant to put to the target.
 * @beta
 */
export interface TransformationRule {
    s?: string;
    f?: (inp: any) => any;
    DEL?: boolean;
    t?: string;
    c?: any;
}
export declare type TransformationRules = Array<TransformationRule>;
/**
 * The ConvOps class provides static methods to transform JS to another JS object
 * according to the set of transformation rules.
 * @beta
 */
export declare class ConvOps {
    /**
     * Validates the rule to ensure its correctness.
     * This method is not private if the rule needs to be validated before an execution.
     * @param rule TransformationRule to be validated.
     * @returns Void if the rule is correct, otherwise throws an error
     */
    static assertRuleIsCorrect(rule: TransformationRule): void;
    /**
     * Apply transformation rule to the record.
     * @param inputRecord JS object to transform
     * @param transformationRules Rule to apply
     * @returns Transformed JS object
     */
    static transformRecord(inputRecord: Record<string, any>, transformationRules: TransformationRules): Record<string, any>;
    /**
     * Converts array of JS Objects to a single record according to the rules.
     * Usage:
     * const inputArray = [
     *   {"k": "A", "a": "x", "b": "y"},
     *   {"k": "B", "a": "w", "b": "z"},
     * ];
     *
     * const transformationRules = [
     *   {s: "k", DEL: true},
     *   {s: "a", f: (inp: string) => `-${inp}`}
     * ]
     *
     *const resultRecord = {
     *   "A": {"a": "-x", "b": "y"},
     *   "B":  {"a": "-w", "b": "z"},
     * }
     * @param inputArray Array of JS objects to convert
     * @param keyPath Specifies which field of the input record contains the name of the property of the output record.
     * @param transformationRules Rules to apply
     * @returns Converted array of records
     */
    static arrayToRecord<I, O>(inputArray: Array<I>, keyPath: string, transformationRules?: TransformationRules): Record<string, O>;
    /**
     * Converts array of records to array of records according to the set of rules
     * @param inputRecords Array of input records
     * @param transformationRules transformation rules to apply
     * @returns Converted JS
     */
    static recordsToRecords<T>(inputRecords: Record<string, Record<string, any>>, transformationRules: TransformationRules): Record<string, any>;
}
//# sourceMappingURL=ConvOps.d.ts.map