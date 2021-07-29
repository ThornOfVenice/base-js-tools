import { JSONOps } from "./JSONOps";

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
}