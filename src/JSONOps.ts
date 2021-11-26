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

  static pathStringSplit(pathString: string) {
    const result = [];
    let j = 0;

    for (let i = 0; i < pathString.length; i++) {
      if (i === pathString.length - 1) {
        result.push(pathString.slice(j));
      } else {
        if (pathString.charAt(i) === ".") {
          result.push(pathString.slice(j, i));
          j = i + 1;
        } else if (pathString.charAt(i) === "[" && pathString.charAt(i-1) !== ".") {
          result.push(pathString.slice(j, i));
          j = i;
        }
      }
    }

    return result;
  }

  static pathArrayFromString(pathValue: string) {
    //TODO: add documentation to say how array is converted
    const result: Array<string | number> = JSONOps.pathStringSplit(pathValue);


    for (let i = 0; i < result.length; i++) {
      let resultToken = result[i] as string;

      if (resultToken.charAt(0) === "[") {
        if (resultToken.charAt(resultToken.length - 1) !== "]") {
          throw new Error("JSONOps::pathArrayFromString -> malformed array item");
        }

        result[i] = parseInt(resultToken.slice(1, resultToken.length - 1), 10);
      }
    }

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

  static deleteProperty (
    containerData: Record<string, any>,
    keyPath: Array<string | number>
  ) {

    let refToParentValue = JSONOps._refToPropertyValue(containerData, keyPath.slice(0, keyPath.length - 1));

    const lastKeyToken = keyPath[keyPath.length - 1];
    if (Array.isArray(refToParentValue)) {
      if (typeof lastKeyToken === "number") {
        refToParentValue.splice(lastKeyToken, 1);
      } else {
        throw new Error("JSONOps::deleteProperty -> lastKey token is not numeric");
      }
      
    } else {
      delete refToParentValue[lastKeyToken];
    }

    return containerData;
  }

  static modifyProperty (
    containerData: Record<string, any>,
    keyPathString: string,
    actionDescriptor: "delete" | "modify",
    value?: any
  ) {

    const keyPathArray = JSONOps.pathArrayFromString(keyPathString);

    if (actionDescriptor === "modify") {
      return JSONOps.patchPropertyValue(containerData, keyPathArray, value);
    } else if (actionDescriptor === "delete") {
      return JSONOps.deleteProperty(containerData, keyPathArray);
    } else {
      throw new Error("JSONOps::modifyProperty -> Invalid actionDescriptor. Only delete & modify are allowed");
    }

  }

}