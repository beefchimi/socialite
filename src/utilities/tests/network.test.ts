import {describe, it, expect} from 'vitest';

import {facebook} from '../../networks';
import type {SocialiteNetworkProperties} from '../../types';
import {filterNetworkProperties} from '../network';

describe('Network utilities', () => {
  describe('filterNetworkProperties()', () => {
    it('removes nothing when `subset` is empty', () => {
      const result = filterNetworkProperties(facebook, []);
      expect(result).toStrictEqual(facebook);
    });

    it('removes all properties passed by `subset`', () => {
      const mockSubset: SocialiteNetworkProperties = ['id', 'matcher'];
      const result = filterNetworkProperties(facebook, mockSubset);

      expect(result).toStrictEqual({
        id: 'facebook',
        matcher: {
          domain: /facebook/,
        },
      });
    });
  });
});
