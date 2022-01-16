import {filterNullishValuesFromObject} from '../general';
import {mockObject} from './fixtures';

describe('General utilities', () => {
  describe('filterNullishValuesFromObject()', () => {
    it('removes any property with a `null` or `undefined` value', () => {
      const result = filterNullishValuesFromObject(mockObject);

      expect(result).toStrictEqual({
        one: 1,
        two: 1 + 1,
        four: '4',
        five: 'five',
        six: true,
        seven: false,
        eight: ['e', 'i', 'g', 'h', 't'],
        ten: {eleven: 11},
      });
    });
  });
});
