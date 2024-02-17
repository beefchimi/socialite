import type {BasicObject} from '../types';

export function arrayDedupe<T extends unknown[]>(...arrays: T[]) {
  // Not recursive (will not dedupe nested arrays).
  return [...new Set([...arrays.flat()])];
}

export const typedObjectKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;

export function objFilterNullish<T = BasicObject>(obj = {}): T {
  const keys = typedObjectKeys(obj);

  // NOTE: This filter function is not recursive!
  return keys.reduce<T>((accumulator, current) => {
    return obj[current] == null
      ? accumulator
      : {
          ...accumulator,
          [current]: obj[current],
        };
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  }, {} as T);
}
