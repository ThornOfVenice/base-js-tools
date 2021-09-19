import { JSONOps } from "./JSONOps";
import produce from "immer"; //TODO: are we exporting this module too?

export interface TransformationRule {
  s?: string; 
  f?: (inp: any) => any; 
  DEL?: boolean; 
  t?: string; 
  c?: any;
}

export type TransformationRules = Array<TransformationRule>;

export class ConvOps {

  static transformRecord(
    inputRecord: Record<string, any>,
    //TODO: typefy properly
    transformationRules: TransformationRules
    ) {

    const result = produce(inputRecord, draftState => {      
      transformationRules.forEach(item => {
        if (item.f) {
          const sourcePath = JSONOps.pathArrayFromString(item.s);
          const sourceValue = JSONOps.getPropertyValue(draftState, sourcePath);
          const targetValue = item.f(sourceValue);

          const targetPath = item.t ? JSONOps.pathArrayFromString(item.t) : sourcePath;

          JSONOps.patchPropertyValue(draftState, targetPath, targetValue);
        } else if (item.c) {
          const targetPath = JSONOps.pathArrayFromString(item.t);
          JSONOps.patchPropertyValue(draftState, targetPath, item.c);
        }
      });

      transformationRules.filter(item => item.DEL).forEach(item => {
          //TODO: delete nested value

          // delete draftState[item.s];
          const sourcePath = JSONOps.pathArrayFromString(item.s);
          JSONOps.deleteProperty(draftState, sourcePath);
      });

    }); 

    return result;
  }

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