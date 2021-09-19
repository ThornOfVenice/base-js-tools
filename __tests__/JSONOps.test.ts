import { JSONOps } from "../src/JSONOps";

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
      JSONOps.deletePropertyValue(
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

});