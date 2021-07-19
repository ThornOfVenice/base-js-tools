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