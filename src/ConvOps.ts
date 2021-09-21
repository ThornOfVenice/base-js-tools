import { JSONOps } from "./JSONOps";
import produce from "immer";

//TODO: typefy properly to ensure what can and cannot go together
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

export type TransformationRules = Array<TransformationRule>;

/**
 * The ConvOps class provides static methods to transform JS to another JS object
 * according to the set of transformation rules.
 * @beta
 */
export class ConvOps {

  /**
   * Validates the rule to ensure its correctness.
   * This method is not private if the rule needs to be validated before an execution.
   * @param rule TransformationRule to be validated.
   * @returns Void if the rule is correct, otherwise throws an error
   */
  static assertRuleIsCorrect(rule: TransformationRule) {
    if (rule.f && !rule.s) {
      throw new Error("ConvOps::assertRuleIsCorrect -> can't have empty (s)ource for specified (f)unction");
    }
    if (rule.c && !rule.t) {
      throw new Error("ConvOps::assertRuleIsCorrect -> can't have empty (t)arget for specified (c)onstant");
    }
    if (rule.DEL && !rule.s) {
      throw new Error("ConvOps::assertRuleIsCorrect -> can't have empty (s)ource for specified (DEL)etion");
    }
  }

  /**
   * Apply transformation rule to the record.
   * @param inputRecord JS object to transform
   * @param transformationRules Rule to apply
   * @returns Transformed JS object
   */
  static transformRecord(
    inputRecord: Record<string, any>,
    transformationRules: TransformationRules
    ) {

    //TODO: may be there's a better way for typescript to see
    transformationRules.forEach(ruleItem => ConvOps.assertRuleIsCorrect(ruleItem));

    const result = produce(inputRecord, draftState => {      
      transformationRules.forEach(item => {

        if (item.f) {
          const sourcePath = JSONOps.pathArrayFromString(item.s!);
          const sourceValue = JSONOps.getPropertyValue(draftState, sourcePath);
          const targetValue = item.f(sourceValue);

          const targetPath = item.t ? JSONOps.pathArrayFromString(item.t) : sourcePath;

          JSONOps.patchPropertyValue(draftState, targetPath, targetValue);
        } else if (item.c) {
          const targetPath = JSONOps.pathArrayFromString(item.t!);
          JSONOps.patchPropertyValue(draftState, targetPath, item.c);
        }
      });

      transformationRules.filter(item => item.DEL).forEach(item => {
          //TODO: delete nested value

          // delete draftState[item.s];
          const sourcePath = JSONOps.pathArrayFromString(item.s!);
          JSONOps.deleteProperty(draftState, sourcePath);
      });

    }); 

    return result;
  }

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
  static arrayToRecord<I, O>(inputArray: Array<I>, keyPath: string, transformationRules?: TransformationRules) {
    // TODO: support more complex key path
    // TODO: support shallow or not shallow copy

    const resultRecord: Record<string, O> = {};
    const keyArray = JSONOps.pathArrayFromString(keyPath);
    
    inputArray.forEach((arrayItem: I) => {
      const keyValue = JSONOps.getPropertyValue(arrayItem, keyArray);
      
      if (transformationRules) {
        resultRecord[keyValue] = ConvOps.transformRecord(arrayItem, transformationRules) as O;
      } else {
        resultRecord[keyValue] = produce(arrayItem, draftState => {}) as unknown as O;
      }
      
    });

    return resultRecord;
  }

  /**
   * Converts array of records to array of records according to the set of rules
   * @param inputRecords Array of input records
   * @param transformationRules transformation rules to apply
   * @returns Converted JS
   */
  static recordsToRecords<T>(
    inputRecords: Record<string, Record<string, any>>,
    transformationRules: TransformationRules
    ) {

    const result: Record<string, any> = {};

    Object.keys(inputRecords).forEach(itemKey => {
      result[itemKey] = ConvOps.transformRecord(inputRecords[itemKey], transformationRules) as T;
    });

    return result;
  }
}