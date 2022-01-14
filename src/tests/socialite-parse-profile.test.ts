import {facebook as networkFacebook} from '../networks';
import {Socialite} from '../socialite';
import {
  mockFacebookUrl,
  mockFacebookProfile,
  mockFooUrl,
  mockFooNetwork,
  mockFooProfile,
  mockMinimalUrl,
  mockMinimalProfile,
  mockTwitterPrefix,
  mockTwitterUrl,
  mockTwitterProfile,
  invalidProfileUrls,
} from './fixtures';

describe('Socialite > parseProfile()', () => {
  test('Returns `false` when minimum criteria is not met', () => {
    const mockSocialite = new Socialite();
    const allResultsInvalid = invalidProfileUrls.every(
      (url) => mockSocialite.parseProfile(url) === false,
    );

    expect(allResultsInvalid).toBe(true);
  });

  test('Returns `false` when the social network does not exist', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockFooUrl);

    expect(result).toBe(false);
  });

  test('Returns profile when the custom social network has been added', () => {
    const mockSocialite = new Socialite();
    mockSocialite.addNetwork(mockFooNetwork);
    const result = mockSocialite.parseProfile(mockFooUrl);

    expect(result).toStrictEqual(mockFooProfile);
  });

  test('Returns profile for a default network', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockFacebookUrl);

    expect(result).toStrictEqual(mockFacebookProfile);
  });

  test('Returns minimum profile when no `path` is found', () => {
    const mockSocialite = new Socialite();
    const result = mockSocialite.parseProfile(mockMinimalUrl);

    expect(result).toStrictEqual(mockMinimalProfile);
  });

  describe('prefix', () => {
    test('Property is omitted from profile when absent from the network', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(mockFacebookUrl);

      expect(result).not.toHaveProperty('prefix');
    });

    test('Property is present in profle when included by the network', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(mockTwitterUrl);

      expect(result).toHaveProperty('prefix', mockTwitterPrefix);
    });

    test('Is omitted from the parsed user name', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(mockTwitterUrl);

      expect(result).toStrictEqual(mockTwitterProfile);
    });
  });

  describe('id', () => {
    test('Returns `false` when provided but network does not exist', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(
        'https://foo.com/FooBar',
        'foo',
      );

      expect(result).toBe(false);
    });

    test('Returns profile when provided and network exists', () => {
      const mockSocialite = new Socialite();
      const result = mockSocialite.parseProfile(
        mockFacebookUrl,
        networkFacebook.id,
      );

      expect(result).toStrictEqual(mockFacebookProfile);
    });
  });
});
