export class SetOps {

  static union<T>(setA: Set<T>, setB: Set<T>) {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}

  static diff<T>(setA: Set<T>, setB: Set<T>) {
    let _difference = new Set(setA);
   
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
  }

  static sameSets<T>(setA: Set<T>, setB: Set<T>) {

    for (let elemA of setA) {
      if (!setB.has(elemA)) return false;
    }
    for (let elemB of setB) {
      if (!setA.has(elemB)) return false;
    }

    return true;
  }
}