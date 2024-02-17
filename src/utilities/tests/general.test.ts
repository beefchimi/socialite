import {describe, it, expect} from 'vitest';

import {arrayDedupe, objFilterNullish, typedObjectKeys} from '../general';

describe('General utilities', () => {
  describe('arrayDedupe()', () => {
    it('removes duplicates within a single array', async () => {
      const result = arrayDedupe([1, 2, 3, 1, 2, 3]);
      expect(result).toStrictEqual([1, 2, 3]);
    });

    it('removes duplicates across multiple arrays', async () => {
      const result = arrayDedupe([1, 2, 3], [3, 2, 1], [4, 2, 0]);
      expect(result).toStrictEqual([1, 2, 3, 4, 0]);
    });
  });

  describe('objFilterNullish()', () => {
    it('returns an object with all null and undefined entries removed', async () => {
      const mockObj = {
        foo: 1,
        bar: 2,
        beef: true,
        chimi: false,
        ear: null,
        wurm: undefined,
        chicken: 0,
        friendship: Infinity,
      };

      const result = objFilterNullish(mockObj);

      expect(result).toStrictEqual({
        foo: 1,
        bar: 2,
        beef: true,
        chimi: false,
        chicken: 0,
        friendship: Infinity,
      });
    });
  });

  describe('typedObjectKeys()', () => {
    it('returns the equivalent of Object.keys()', async () => {
      const mockObj = {
        foo: 1,
        bar: 'two',
        beef: false,
        chimi: null,
        earwurm: undefined,
      };
      const result = typedObjectKeys(mockObj);

      expect(result).toStrictEqual(['foo', 'bar', 'beef', 'chimi', 'earwurm']);
      expect(result).toStrictEqual(Object.keys(mockObj));
    });
  });
});
