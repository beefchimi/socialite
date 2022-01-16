import {allSocialNetworks} from '../../data';
import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {mockGenericUser} from '../../tests/fixtures';
import {tiktok} from '../tiktok';

describe('Social networks > tiktok', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockCommonUrl = `https://www.tiktok.com/${tiktok.prefix}${mockGenericUser}`;

  it('returns expected `id`, `user`, and `prefix` from common url', () => {
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(tiktok.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(tiktok.prefix);
  });

  it('returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(tiktok.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(tiktok.prefix);
  });
});
