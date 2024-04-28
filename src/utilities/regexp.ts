import {arrayDedupe} from 'beeftools';
import type {MergedRegExp} from '../types';

export function mergeRegExp(...expressions: RegExp[]): MergedRegExp {
  const source = expressions.map((exp) => exp.source).join('');
  const flags = arrayDedupe(
    expressions.map((exp) => exp.flags.split('')).flat(),
  ).join('');

  return {source, flags};
}
