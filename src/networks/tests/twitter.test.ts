import {allSocialNetworks} from '../../data';
import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {mockGenericUser} from '../../tests/fixtures';
import {twitter} from '../twitter';

describe('Social networks > twitter', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockCommonUrl = `https://www.twitter.com/${twitter.prefix}${mockGenericUser}`;

  it('returns expected `id`, `user`, and `prefix` from common url', () => {
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(twitter.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(twitter.prefix);
  });

  it('returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user, prefix} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(twitter.id);
    expect(user).toBe(mockGenericUser);
    expect(prefix).toBe(twitter.prefix);
  });
});
