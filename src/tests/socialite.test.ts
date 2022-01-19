import {defaultSocialiteNetworks} from '../data';
import {Socialite} from '../socialite';
import type {SocialiteNetwork, UrlMinCriteria} from '../types';
import {mockCustomNetworks} from './fixtures';

describe('Socialite class instance', () => {
  it('instantiates a Socialite instance', () => {
    const mockSocialite = new Socialite();
    expect(mockSocialite).toBeInstanceOf(Socialite);
  });

  it('contains the default networks', () => {
    const mockSocialite = new Socialite();
    expect(mockSocialite.getNetworks()).toStrictEqual(defaultSocialiteNetworks);
  });

  it('constructor argument overwrites the default networks', () => {
    const mockSocialite = new Socialite(mockCustomNetworks);
    expect(mockSocialite.getNetworks()).toStrictEqual(mockCustomNetworks);
  });

  it('constructor argument ignores an empty array', () => {
    const mockNetworks: SocialiteNetwork[] = [];
    const mockSocialite = new Socialite(mockNetworks);

    expect(mockSocialite.getNetworks()).toStrictEqual(defaultSocialiteNetworks);
  });

  describe('fixUrlScheme()', () => {
    it('returns the `url` unchanged when a `scheme` (http://) is present', () => {
      const mockUrl = 'http://domain.com';

      const mockSocialite = new Socialite();
      const result = mockSocialite.fixUrlScheme(mockUrl);

      expect(result).toBe(mockUrl);
    });

    it('returns the `url` unchanged when a `scheme` (https://) is present', () => {
      const mockUrl = 'https://domain.com';

      const mockSocialite = new Socialite();
      const result = mockSocialite.fixUrlScheme(mockUrl);

      expect(result).toBe(mockUrl);
    });

    it('appends `https://` when no `scheme` is found', () => {
      const mockUrl = 'www.domain.com';

      const mockSocialite = new Socialite();
      const result = mockSocialite.fixUrlScheme(mockUrl);

      expect(result).toBe(`https://${mockUrl}`);
    });
  });

  describe('mergeGroupsToUrl()', () => {
    it('joins a subset of properties', () => {
      const mockPartialUrlGroups: UrlMinCriteria = {
        domain: 'domain',
        tldomain: '.com',
        parameters: '?query=param',
      };

      const mockSocialite = new Socialite();
      const result = mockSocialite.mergeGroupsToUrl(mockPartialUrlGroups);

      expect(result).toBe('domain.com?query=param');
    });

    it('joins a full set of properties', () => {
      const mockFullUrlGroups: UrlMinCriteria = {
        scheme: 'https://',
        subdomain: 'www.sub.',
        domain: 'domain',
        tldomain: '.com',
        port: ':123',
        path: '/path/to/folder',
        parameters: '?query=param',
        anchor: '#hash-anchor',
      };

      const mockSocialite = new Socialite();
      const result = mockSocialite.mergeGroupsToUrl(mockFullUrlGroups);

      expect(result).toBe(
        'https://www.sub.domain.com:123/path/to/folder?query=param#hash-anchor',
      );
    });
  });
});
