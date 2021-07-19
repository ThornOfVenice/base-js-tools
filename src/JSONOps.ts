export class JSONOps {

  private static _refToPropertyValue (
    containerData: Record<string, any>,
    keyPath: Array<string | number>
  ) {
    let runningPropertyPointer = containerData;

    keyPath.forEach(keyItem => {
      runningPropertyPointer = runningPropertyPointer[keyItem];

    });

    return runningPropertyPointer;
  }

  static getPropertyValue (
    containerData: Record<string, any>,
    keyPath: Array<string | number>
    ) {

    return JSONOps._refToPropertyValue(containerData, keyPath);

  }

  static patchPropertyValue (
    containerData: Record<string, any>,
    keyPath: Array<string | number>,
    value: any
  ) {

    let refToParentValue = JSONOps._refToPropertyValue(containerData, keyPath.slice(0, keyPath.length - 1));

    const lastKeyToken = keyPath[keyPath.length - 1];
    refToParentValue[lastKeyToken] = value;

    return containerData;
  }

  static deletePropertyValue (
    containerData: Record<string, any>,
    keyPath: Array<string | number>
  ) {

    let refToParentValue = JSONOps._refToPropertyValue(containerData, keyPath.slice(0, keyPath.length - 1));

    const lastKeyToken = keyPath[keyPath.length - 1];
    if (Array.isArray(refToParentValue[lastKeyToken])) {
      throw new Error("JSONOps::deletePropertyValue - array item deletion is not supported yet");
    } else {
      delete refToParentValue[lastKeyToken];
    }

    return containerData;
  }  
}