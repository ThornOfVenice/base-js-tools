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

  test("converting single scalar record in place", () => {
    const inputRecord = {
      "a": "test/value",
      "b": 5,
      "c": true,
      "d": "loose value",
      "e": {"f": "delete nested value"},
      "g": {"f": "delete nested block"},
    }

    const transformationRule = [
      {s: "a", f: (inp: string) => { return inp.split("/")[1]; }},
      {s: "b", f: (inp: number) => { return inp * 2; }},
      {s: "c", f: (inp: boolean) => { return !inp; }},
      {c: "CONSTANT", t: "k"},
      {s: "d", DEL: true},
      {s: "e.f", DEL: true},
      {s: "g", DEL: true}
    ];

    const outputRecord = {
      "a": "value",
      "b": 10,
      "c": false,
      "e": {},
      "k": "CONSTANT"
    }

    expect(ConvOps.transformRecord(inputRecord, transformationRule)).toEqual(outputRecord);
  });

  test("converting record with nested value", () => {
    const inputRecord = {
      "a": {"b": "test/value"},
    }

    const transformationRule = [
      {s: "a.b", f: (inp: string) => { return inp.split("/")[1]; }},
    ];

    const outputRecord = {
      "a": {"b": "value"},
    }

    expect(ConvOps.transformRecord(inputRecord, transformationRule)).toEqual(outputRecord);
  });

  test("converting single scalar, copy to different values, preserve old values", () => {
    const inputRecord = {
      "a": "test/value",
      "b": 5,
      "c": true,
    }

    const transformationRule = [
      {s: "a", f: (inp: string) => { return inp.split("/")[1]; }, t: "x"},
      {s: "b", f: (inp: number) => { return inp * 2; }, t: "y"},
      {s: "c", f: (inp: boolean) => { return !inp; }, t: "z"},
    ];

    const outputRecord = {
      "a": "test/value",
      "b": 5,
      "c": true,
      "x": "value",
      "y": 10,
      "z": false
    }

    expect(ConvOps.transformRecord(inputRecord, transformationRule)).toEqual(outputRecord);
  });  

  test("converting single scalar, copy to different values, delete old values", () => {
    const inputRecord = {
      "a": "test/value",
      "b": 5,
      "c": true,
    }

    const transformationRule = [
      {s: "a", f: (inp: string) => { return inp.split("/")[1]; }, t: "x", DEL: true},
      {s: "b", f: (inp: number) => { return inp * 2; }, t: "y", DEL: true},
      {s: "c", f: (inp: boolean) => { return !inp; }, t: "z", DEL: true},
    ];

    const outputRecord = {
      "x": "value",
      "y": 10,
      "z": false
    }

    expect(ConvOps.transformRecord(inputRecord, transformationRule)).toEqual(outputRecord);
  });    
});