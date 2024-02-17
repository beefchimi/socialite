import {describe, it, expect} from 'vitest';

import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {twitter} from '../twitter';

describe('Social networks > twitter', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);

  it('returns expected `id`, `user`, and `prefix` from common url', () => {
    const mockCommonUrl = `https://www.twitter.com/${mockGenericUser}`;

    const {id, user, prefix} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(twitter.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(twitter.prefix);
  });

  it('returns expected `id`, `user`, and `prefix` from prefixed url', () => {
    const mockPrefixedUrl = `https://www.twitter.com/${twitter.prefix}${mockGenericUser}`;

    const {id, user, prefix} = mockSocialite.parseProfile(
      mockPrefixedUrl,
    ) as SocialiteProfile;

    expect(id).toBe(twitter.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(twitter.prefix);
  });

  it('returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
    const mockUncommonUrl = `https://www.twitter.com/${twitter.prefix}${mockGenericUser}/trail-123`;
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(twitter.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(twitter.prefix);
  });
});
