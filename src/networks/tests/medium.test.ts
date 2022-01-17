import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {medium} from '../medium';

describe('Social networks > medium', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.medium.com/${medium.prefix}${mockGenericUser}`;

  it('returns expected `id`, `user`, and `prefix` from common url', () => {
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(medium.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(medium.prefix);
  });

  it('returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(medium.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(medium.prefix);
  });
});
