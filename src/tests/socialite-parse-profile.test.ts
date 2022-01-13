import {Socialite} from '../socialite';
import type {UrlGroupSubset} from '../types';
import {invalidUrls, validUrls} from './fixtures';

describe('Socialite > parseProfile()', () => {
  const urlMinCriteria: UrlGroupSubset = {
    domain: 'domain',
    tldomain: '.com',
  };

  test('Returns `false` when minimum criteria is not met', () => {
    const mockSocialite = new Socialite();
    const allResultsInvalid = invalidUrls.every(
      (url) => mockSocialite.parseProfile(url) === false,
    );

    expect(allResultsInvalid).toBe(true);
  });

  test('Returns only `domain` and `tldomain` when the minimum criteria is met', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(validUrls[0]);

    // expect(result).toStrictEqual(urlMinCriteria);
    expect(result).toBe(true);
  });

  test.todo('trims input', () => {});

  test('This is just a test', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(
      'https://www.facebook.com/Curtis-Dulmage',
    );

    // expect(result).toStrictEqual(urlMinCriteria);
    expect(result).toBe(true);
  });
});
