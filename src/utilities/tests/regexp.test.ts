import {mergeRegExp} from '../regexp';
import {mockRegExps} from './fixtures';

describe('Regular expression utilities', () => {
  describe('mergeRegExp()', () => {
    it('merges regular expression sources', () => {
      const result = mergeRegExp(...mockRegExps);
      expect(result.source).toBe(
        '^(abc|123)(?<Group>https?:\\/\\/)?[^/]+(?:\\w\\d)$',
      );
    });

    it('merges regular expression flags and removes duplicates', () => {
      const result = mergeRegExp(...mockRegExps);
      expect(result.flags).toBe('gmi');
    });
  });
});
