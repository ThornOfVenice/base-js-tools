export declare class SetOps {
    static union<T>(setA: Set<T>, setB: Set<T>): Set<T>;
    static diff<T>(setA: Set<T>, setB: Set<T>): Set<T>;
    static sameSets<T>(setA: Set<T>, setB: Set<T>): boolean;
}
