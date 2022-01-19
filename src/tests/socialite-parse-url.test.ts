import {Socialite} from '../socialite';
import type {UrlAnatomy} from '../types';
import {invalidUrls, validUrls} from './fixtures';

describe('Socialite > parseUrl()', () => {
  const urlMinCriteria: UrlAnatomy = {
    domain: 'domain',
    tldomain: '.com',
  };

  it('returns `false` when minimum criteria is not met', () => {
    const mockSocialite = new Socialite();
    const allResultsInvalid = invalidUrls.every(
      (url) => mockSocialite.parseUrl(url) === false,
    );

    expect(allResultsInvalid).toBe(true);
  });

  it('returns only `domain` and `tldomain` when the minimum criteria is met', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[0]);

    expect(result).toStrictEqual(urlMinCriteria);
  });

  it('returns a valid result for `url` when minimum criteria is met', () => {
    const mockSocialite = new Socialite();
    const allResultsValid = validUrls.every((url) =>
      Boolean(mockSocialite.parseUrl(url)),
    );

    expect(allResultsValid).toBe(true);
  });

  it('returns `subdomain` (www) when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[1]);

    expect(result).toStrictEqual({
      ...urlMinCriteria,
      subdomain: 'www.',
    });
  });

  it('returns `scheme` (http://) when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[2]);

    expect(result).toStrictEqual({
      ...urlMinCriteria,
      scheme: 'http://',
    });
  });

  it('returns `scheme` (https://) when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[3]);

    expect(result).toStrictEqual({
      ...urlMinCriteria,
      scheme: 'https://',
    });
  });

  it('returns with `port` when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[5]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      port: ':123',
    });
  });

  it('returns `path` with trailing slash when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[9]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      path: '/path/to/',
    });
  });

  it('returns `path` without trailing slash when absent', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[10]);

    expect(result).toMatchObject({
      ...urlMinCriteria,
      path: '/path/to/folder',
    });
  });

  it('returns `parameters` when present', () => {
    const mockSocialite = new Socialite();

    const result1 = mockSocialite.parseUrl(validUrls[11]);
    expect(result1).toMatchObject({
      ...urlMinCriteria,
      parameters: '?query=param',
    });

    const result2 = mockSocialite.parseUrl(validUrls[12]);
    expect(result2).toMatchObject({
      ...urlMinCriteria,
      tldomain: '.com',
      parameters: '?query=param',
    });
  });

  it('returns `anchor` when present', () => {
    const mockSocialite = new Socialite();

    const result1 = mockSocialite.parseUrl(validUrls[13]);
    expect(result1).toMatchObject({
      ...urlMinCriteria,
      anchor: '#hash-anchor',
    });

    const result2 = mockSocialite.parseUrl(validUrls[14]);
    expect(result2).toMatchObject({
      ...urlMinCriteria,
      tldomain: '.com',
      anchor: '#hash-anchor',
    });
  });

  it('returns matched group when present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[24]);

    expect(result).toStrictEqual({
      scheme: 'https://',
      subdomain: 'www.sub.',
      domain: 'domain',
      tldomain: '.com',
      port: ':123',
      path: '/path/to/',
      parameters: '?query=param',
      anchor: '#hash-anchor',
    });
  });

  it('does not break when various special characters are present', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseUrl(validUrls[26]);

    expect(result).toStrictEqual({
      scheme: 'https://',
      subdomain: 'www.sub1.sub2.',
      domain: 'domain',
      tldomain: '.com',
      port: ':123',
      path: '/!url*()-_.~[]&=+$%path@/@to!*()-_.~[]@&=+$%user!/!*()-_.~[]@&=+$%',
      parameters: '?query!*()-_.~[]@&=+$%param',
      anchor: '#hash!*()-_.~[]@&=+$%anchor',
    });
  });
});
