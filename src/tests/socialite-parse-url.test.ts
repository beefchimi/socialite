import {Socialite} from '../socialite';
import type {UrlGroupSubset} from '../types';
import {invalidUrls, validUrls} from './fixtures';

describe('Socialite > parseUrl()', () => {
  const urlMinCriteria: UrlGroupSubset = {
    domain: 'domain',
    tldomain: '.com',
  };

  test('Returns `false` when minimum criteria is not met', () => {
    const mockSocialite = new Socialite();
    const allResultsInvalid = invalidUrls.every(
      (url) => mockSocialite.parseUrl(url) === false,
    );

    expect(allResultsInvalid).toBe(true);
  });

  test('Returns only `domain` and `tldomain` when the minimum criteria is met', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[0]);

    expect(result).toStrictEqual(urlMinCriteria);
  });

  test('Returns a valid result for every `url` when minimum criteria is met', () => {
    const mockSocialite = new Socialite();
    const allResultsValid = validUrls.every((url) =>
      Boolean(mockSocialite.parseUrl(url)),
    );

    expect(allResultsValid).toBe(true);
  });

  test('Returns `subdomain` (www.) when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[1]);

    expect(result).toStrictEqual({
      ...urlMinCriteria,
      subdomain: 'www.',
    });
  });

  test('Returns `scheme` (http://) when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[2]);

    expect(result).toStrictEqual({
      ...urlMinCriteria,
      scheme: 'http://',
    });
  });

  test('Returns `scheme` (https://) when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[3]);

    expect(result).toStrictEqual({
      ...urlMinCriteria,
      scheme: 'https://',
    });
  });

  test('Returns `tldomain` with trailing `/` when present and not followed by anything', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[4]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      tldomain: '.com/',
    });
  });

  test('Returns with `port` when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[5]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      port: ':123',
    });
  });

  test('Returns `port` with trailing `/` when present and not followed by anything', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[8]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      port: ':123/',
    });
  });

  test('Returns `path` with trailing slash when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[9]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      path: '/path/to/',
    });
  });

  test('Returns `path` without trailing slash when absent', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[10]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      path: '/path/to/folder',
    });
  });

  test('Returns `parameters` when present', () => {
    const mockSocialite = new Socialite();

    const result1 = mockSocialite.parseUrl(validUrls[11]);
    expect(result1).toMatchObject({
      ...urlMinCriteria,
      parameters: '?query=param',
    });

    const result2 = mockSocialite.parseUrl(validUrls[12]);
    expect(result2).toMatchObject({
      ...urlMinCriteria,
      tldomain: '.com/',
      parameters: '?query=param',
    });
  });

  test('Returns `anchor` when present', () => {
    const mockSocialite = new Socialite();

    const result1 = mockSocialite.parseUrl(validUrls[13]);
    expect(result1).toMatchObject({
      ...urlMinCriteria,
      anchor: '#hash-anchor',
    });

    const result2 = mockSocialite.parseUrl(validUrls[14]);
    expect(result2).toMatchObject({
      ...urlMinCriteria,
      tldomain: '.com/',
      anchor: '#hash-anchor',
    });
  });

  test('Returns every matched group when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[24]);

    expect(result).toStrictEqual({
      scheme: 'https://',
      subdomain: 'www.',
      domain: 'sub.domain',
      tldomain: '.com',
      port: ':123',
      path: '/path/to/',
      parameters: '?query=param',
      anchor: '#hash-anchor',
    });
  });

  test('Does not break when various special characters are present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[26]);

    expect(result).toStrictEqual({
      scheme: 'https://',
      subdomain: 'www.',
      domain: 'sub1.sub2.domain',
      tldomain: '.com',
      port: ':123',
      path: '/!url*()-_.~[]&=+$%path@/@to!*()-_.~[]@&=+$%user!/!*()-_.~[]@&=+$%',
      parameters: '?query!*()-_.~[]@&=+$%param',
      anchor: '#hash!*()-_.~[]@&=+$%anchor',
    });
  });
});
