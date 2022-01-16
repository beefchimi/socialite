import type {BasicObject} from '../types';

// TODO: Consider a recursive version of this function.
export function filterNullishValuesFromObject<T = BasicObject>(obj: T) {
  const keys = Object.keys(obj) as (keyof typeof obj)[];

  return keys.reduce<T>((accumulator, current) => {
    return obj[current] == null
      ? accumulator
      : {
          ...accumulator,
          [current]: obj[current],
        };
  }, {} as T);
}
