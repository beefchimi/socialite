import {describe, it, expect} from 'vitest';

import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {tiktok} from '../tiktok';

describe('Social networks > tiktok', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.tiktok.com/${tiktok.prefix}${mockGenericUser}`;

  it('returns expected `id`, `user`, and `prefix` from common url', () => {
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(tiktok.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(tiktok.prefix);
  });

  it('returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(tiktok.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(tiktok.prefix);
  });
});
