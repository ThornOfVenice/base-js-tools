import { ConvOps } from "../src/ConvOps";

describe("testing basic ConvOps", () => {
  test("testing very basic extraction", () => {
    let inputArray = [
      {"k": "A", "a": "x", "b": "y"},
      {"k": "B", "a": "w", "b": "z"},
    ];

    let resultRecord = {
      "A": {"k": "A", "a": "x", "b": "y"},
      "B":  {"k": "B", "a": "w", "b": "z"},
    }

    expect(ConvOps.arrayToRecord(inputArray, "k")).toEqual(resultRecord);
  });
});