import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {youtube} from '../youtube';

describe('Social networks > youtube', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.youtube.com/channel/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when provided app url', () => {
    const mockUncommonUrl = `https://m.youtube.com/c/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });

  it('does not match against the short url', () => {
    const mockUncommonUrl = `https://youtu.be/c/${mockGenericUser}`;
    const match = mockSocialite.parseProfile(mockUncommonUrl);

    expect(match).toBe(false);
  });
});
