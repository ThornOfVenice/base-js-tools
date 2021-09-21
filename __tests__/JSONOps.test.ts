import { JSONOps } from "../src/JSONOps";

describe("test path conversion", () => {
  test("test basic path conversion", () => {
    let testInput = "a.b.c";
    let testOutput = ["a", "b", "c"];

    expect(JSONOps.pathArrayFromString(testInput)).toEqual(testOutput);
  });
  test("test path conversion with array", () => {
    let testInput = "a.b.[7]";
    let testOutput = ["a", "b", 7];

    expect(JSONOps.pathArrayFromString(testInput)).toEqual(testOutput);
  });  
});

describe("Testing basic JSONOps read operations", () => {

  test("scalar value", () => {

    let testJSON = {
      "a": {
        "b": {
          "c": 5
        }
      }
    }

    expect(
      JSONOps.getPropertyValue(
        testJSON,
        ["a", "b", "c"]
      )
    ).toEqual(5);
  });

  test("sub value", () => {

    let testJSON = {
      "a": {
        "b": {
          "c": 5
        }
      }
    }

    expect(
      JSONOps.getPropertyValue(
        testJSON,
        ["a", "b"]
      )
    ).toEqual({"c": 5});
  });  

  test("array value", () => {

    let testJSON = {
      "a": {
        "b": [
          5, 7, 9
        ]
      }
    }

    expect(
      JSONOps.getPropertyValue(
        testJSON,
        ["a", "b", 1]
      )
    ).toEqual(7);
  });    
});

describe("testing basic patch operations", () => {
  test("patch scalar value", () => {

    let testJSON = {
      "a": {
        "b": {
          "c": 5
        }
      }
    }

    expect(
      JSONOps.patchPropertyValue(
        testJSON,
        ["a", "b", "c"],
        7
      )
    ).toEqual({
      "a": {
        "b": {
          "c": 7
        }
      }
    });
  });

  test("patch array in place", () => {

    let testJSON = {
      "a": {
        "b": [
          5, 7, 9
        ]
      }
    }

    expect(
      JSONOps.patchPropertyValue(
        testJSON,
        ["a", "b", 2],
        15
      )
    ).toEqual({
      "a": {
        "b": [
          5, 7, 15
        ]
      }
    });
  });  

  test("add array property when it does not exist and patch value. Array defined as integer", () => {
    // TODO: add test for non-integer value
    // TODO: add test for index other than 0 - expect Error
    let testInput = {
      "a": {
        "b": {
          "c": 5
        }
      }
    }
    let testOutput = {
      "a": {
        "b": {
          "c": 5,
          "d": [15] /*NEW*/
        }
      }
    }
    expect(
      JSONOps.patchPropertyValue(
        testInput,
        ["a", "b", "d", 0],
        15
      )
    ).toEqual(testOutput);    
  });
});

describe("testing basic delete operations", () => {
  test("delete scalar value", () => {

    let testJSON = {
      "a": {
        "b": {
          "c": 5,
          "d": "AA"
        }
      }
    }

    expect(
      JSONOps.deleteProperty(
        testJSON,
        ["a", "b", "c"]
      )
    ).toEqual({
      "a": {
        "b": {
          "d": "AA"
        }
      }
    });
  });

  test("delete array item", () => {
    let testInput = {
      a: {
        b: [
          0, 1, 2
        ]
      }
    }
    let testOutput = {
      a: {
        b: [
          0, 2
        ]
      }
    }
    expect(JSONOps.deleteProperty(testInput, ["a", "b", 1])).toEqual(testOutput);
  });

});

describe("Basic Safety test for combined modifyProperty operation", () => {
  test("Test modify property", () => {
    let testJSON = {
      "a": {
        "b": [
          5, 7, 9
        ]
      }
    }

    expect(
      JSONOps.modifyProperty(
        testJSON,
        "a.b.[2]",
        "modify",
        15
      )
    ).toEqual({
      "a": {
        "b": [
          5, 7, 15
        ]
      }
    });
  });

  test("Test delete property", () => {

    let testJSON = {
      "a": {
        "b": {
          "c": 5,
          "d": "AA"
        }
      }
    }

    expect(
      JSONOps.modifyProperty(
        testJSON,
        "a.b.c",
        "delete"
      )
    ).toEqual({
      "a": {
        "b": {
          "d": "AA"
        }
      }
    });
  });

  test("Invalid descriptor", () => {
    let testJSON = {}
    //@ts-expect-error
    expect(() => {JSONOps.modifyProperty(testJSON, "a.b.c", "illegal")}).toThrowError(/actionDescriptor/);
  });
});