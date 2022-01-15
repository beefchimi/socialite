import type {MergedRegExp} from '../types';

export function constructFullLineRegExp(...captureGroups: (string | RegExp)[]) {
  return new RegExp(['^', ...captureGroups, '$'].join(''));
}

export function mergeRegExp(...expressions: RegExp[]): MergedRegExp {
  const source = expressions.map((exp) => exp.source).join('');
  const flags = [
    ...new Set(expressions.map((exp) => exp.flags.split('')).flat()),
  ].join('');

  return {source, flags};
}
