import { JSONOps } from "./JSONOps";
import produce from "immer"; //TODO: are we exporting this module too?

export class ConvOps {
  static arrayToRecord<T>(inputArray: Array<T>, keyPath: string) {
    // TODO: support more complex key path
    // TODO: support shallow or not shallow copy

    const resultRecord: Record<string, T> = {};
    const keyArray = JSONOps.pathArrayFromString(keyPath);

    inputArray.forEach((arrayItem: T) => {
      const keyValue = JSONOps.getPropertyValue(arrayItem, keyArray);
      
      resultRecord[keyValue] = arrayItem;
    });

    return resultRecord;
  }

  static transformRecord(
    inputRecord: Record<string, any>,
    //TODO: typefy properly
    transformationRules: Array<{s?: string; f?: (inp: any) => any; DEL?: boolean; t?: string; c?: any; }>
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
          JSONOps.deletePropertyValue(draftState, sourcePath);
      });

    }); 

    return result;
  }
}