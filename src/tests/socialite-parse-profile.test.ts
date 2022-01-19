import {
  behance as networkBehance,
  substack as networkSubstack,
} from '../networks';
import {Socialite} from '../socialite';
import {
  mockBehanceUrl,
  mockBehanceProfile,
  mockCustomUrl,
  mockCustomNetwork,
  mockCustomProfile,
  mockFacebookUrl,
  mockFacebookProfile,
  mockInstagramGroup,
  mockInstagramProfile,
  mockMinimalUrl,
  mockMinimalGroup,
  mockMinimalProfile,
  mockSubstackUrl,
  mockSubstackProfile,
  mockTwitterPrefix,
  mockTwitterUrl,
  mockTwitterProfile,
  invalidProfileUrls,
} from './fixtures';

describe('Socialite > parseProfile()', () => {
  it('returns `false` when minimum criteria is not met', () => {
    const mockSocialite = new Socialite();
    const allResultsInvalid = invalidProfileUrls.every(
      (url) => mockSocialite.parseProfile(url) === false,
    );

    expect(allResultsInvalid).toBe(true);
  });

  it('returns `false` when the social network does not exist', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockCustomUrl);

    expect(result).toBe(false);
  });

  it('returns profile when the custom social network has been added', () => {
    const mockSocialite = new Socialite();
    mockSocialite.addNetwork(mockCustomNetwork);
    const result = mockSocialite.parseProfile(mockCustomUrl);

    expect(result).toStrictEqual(mockCustomProfile);
  });

  it('returns profile for a default network when passed as `url`', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockFacebookUrl);

    expect(result).toStrictEqual(mockFacebookProfile);
  });

  it('returns profile for a default network when passed as `group`', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockInstagramGroup);

    expect(result).toStrictEqual(mockInstagramProfile);
  });

  it('returns minimum profile from `url` when no `path` is found', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockMinimalUrl);

    expect(result).toStrictEqual(mockMinimalProfile);
  });

  it('returns minimum profile from `group` when no `path` is found', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockMinimalGroup);

    expect(result).toStrictEqual(mockMinimalProfile);
  });

  it('returns minimum profile when no `subdomain` is found and `userSource` specifies `subdomain`', () => {
    const mockSocialite = new Socialite();
    mockSocialite.addNetwork(networkSubstack);
    const result = mockSocialite.parseProfile(mockSubstackUrl);

    expect(result).toStrictEqual(mockSubstackProfile);
  });

  describe('prefix', () => {
    it('property is omitted from profile when absent from the network', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(mockBehanceUrl);

      expect(result).not.toHaveProperty('prefix');
    });

    it('property is present in profle when included by the network', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(mockTwitterUrl);

      expect(result).toHaveProperty('prefix', mockTwitterPrefix);
    });

    it('is omitted from the parsed user name', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(mockTwitterUrl);

      expect(result).toStrictEqual(mockTwitterProfile);
    });
  });

  describe('id', () => {
    it('returns `false` when provided but network does not exist', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(
        'https://foo.com/FooBar',
        'foo',
      );

      expect(result).toBe(false);
    });

    it('returns profile when provided and network exists', () => {
      const mockSocialite = new Socialite();
      mockSocialite.addNetwork(networkBehance);
      const result = mockSocialite.parseProfile(
        mockBehanceUrl,
        networkBehance.id,
      );

      expect(result).toStrictEqual(mockBehanceProfile);
    });
  });
});
