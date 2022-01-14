import type {BasicObject, MergedRegExp} from './types';

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

export function mergeRegExp(...expressions: RegExp[]): MergedRegExp {
  const source = expressions.map((exp) => exp.source).join('');
  const flags = [
    ...new Set(expressions.map((exp) => exp.flags.split('')).flat()),
  ].join('');

  return {source, flags};
}

export function constructFullLineRegExp(...captureGroups: (string | RegExp)[]) {
  return new RegExp(['^', ...captureGroups, '$'].join(''));
}
