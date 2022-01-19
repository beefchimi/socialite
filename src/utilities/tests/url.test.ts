import {
  buildUrlFromGroups,
  fixUrlWithoutScheme,
  getUrlGroups,
  getUrlWithSubstitutions,
} from '../url';
import {
  mockFullUrl,
  mockPartialUrl,
  mockReplacementUrl,
  mockPartialUrlGroups,
  mockFullUrlGroups,
} from './fixtures';

describe('Url utilities', () => {
  describe('buildUrlFromGroups()', () => {
    it('joins a subset of properties', () => {
      const result = buildUrlFromGroups(mockPartialUrlGroups);
      expect(result).toBe('domain.com?query=param');
    });

    it('joins a full set of properties', () => {
      const result = buildUrlFromGroups(mockFullUrlGroups);
      expect(result).toBe(
        'https://www.sub.domain.com:123/path/to/folder?query=param#hash-anchor',
      );
    });
  });

  describe('fixUrlWithoutScheme()', () => {
    it('returns the `url` unchanged when a `scheme` (http://) is present', () => {
      const mockUrl = 'http://domain.com';
      const result = fixUrlWithoutScheme(mockUrl);
      expect(result).toBe(mockUrl);
    });

    it('returns the `url` unchanged when a `scheme` (https://) is present', () => {
      const mockUrl = 'https://domain.com';
      const result = fixUrlWithoutScheme(mockUrl);
      expect(result).toBe(mockUrl);
    });

    it('appends `https://` when no `scheme` is found', () => {
      const mockUrl = 'www.domain.com';
      const result = fixUrlWithoutScheme(mockUrl);
      expect(result).toBe(`https://${mockUrl}`);
    });
  });

  describe('getUrlGroups()', () => {
    it('returns `null` when provided an empty string', () => {
      const result = getUrlGroups('');
      expect(result).toBeNull();
    });

    it('breaks up `url` into groups', () => {
      const result = getUrlGroups(mockFullUrl);
      expect(result).toStrictEqual({
        scheme: 'https://',
        subdomain: 'www.',
        domain: 'domain',
        tldomain: '.com',
        port: ':123',
        path: '/path/to',
        parameters: '?query=param',
        anchor: '#hash-anchor',
      });
    });

    it('only returns the matched groups', () => {
      const result = getUrlGroups(mockPartialUrl);
      expect(result).toStrictEqual({
        scheme: 'http://',
        domain: 'website',
        tldomain: '.ca',
        parameters: '?query=param',
      });
    });

    it('includes multiple subdomains when present', () => {
      const result = getUrlGroups('www.sub1.sub2.domain.com');
      expect(result).toStrictEqual({
        subdomain: 'www.sub1.sub2.',
        domain: 'domain',
        tldomain: '.com',
      });
    });

    it('trims whitespace around `url`', () => {
      const result = getUrlGroups('   https://domain.com/   ');
      expect(result).toStrictEqual({
        scheme: 'https://',
        domain: 'domain',
        tldomain: '.com',
        path: '/',
      });
    });

    it('sanitizes `port`', () => {
      const result = getUrlGroups('domain.com:123/');
      expect(result).toStrictEqual({
        domain: 'domain',
        tldomain: '.com',
        port: ':123',
        path: '/',
      });
    });
  });

  describe('getUrlWithSubstitutions()', () => {
    it('replaces any found profile replacement', () => {
      const mockUser = 'Curtis';
      const mockPrefix = '@';
      const result = getUrlWithSubstitutions(
        mockReplacementUrl,
        mockUser,
        mockPrefix,
      );
      expect(result).toBe(`https://domain.com/${mockPrefix}${mockUser}`);
    });
  });
});
