export class JSONOps {

  private static _refToPropertyValue (
    containerData: Record<string, any>,
    keyPath: Array<string | number>
  ): any  {
    let runningPropertyPointer = containerData;

    keyPath.forEach(keyItem => {
      runningPropertyPointer = runningPropertyPointer[keyItem];

    });

    return runningPropertyPointer;
  }

  static pathArrayFromString(pathValue: string) {
    // TODO: add more complex scenarios like array index[] if ever required
    const result = pathValue.split('.');

    return result;
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
    //TODO: should we explicitly state whether we want to fail on missing property or not
    //TODO: should we allow sparse arrays or not
  ) {

    let refToParentValue = JSONOps._refToPropertyValue(containerData, keyPath.slice(0, keyPath.length - 1));

    const lastKeyToken = keyPath[keyPath.length - 1];

    if (refToParentValue !== undefined) {
      refToParentValue[lastKeyToken] = value;
    } else if (refToParentValue === undefined && typeof lastKeyToken === "number") {
      if (lastKeyToken === 0) {
        JSONOps.patchPropertyValue(containerData, keyPath.slice(0, keyPath.length - 1), [value])
      } else {
        throw new Error("JSONOps.patchPropertyValue -> can't patch non-existent array with id other than 0");
      }
      
    }

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