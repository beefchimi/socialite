import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {reddit} from '../reddit';

describe('Social networks > reddit', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.reddit.com/user/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(reddit.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(reddit.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns `id` with no `user` when provided an unrecognized leading path', () => {
    const mockUnsupportedUrl = `https://reddit.com/foo/${mockGenericUser}`;
    const match = mockSocialite.parseProfile(
      mockUnsupportedUrl,
    ) as SocialiteProfile;

    expect(match.id).toBe(reddit.id);
    expect(match.user).toBeUndefined();
  });
});
