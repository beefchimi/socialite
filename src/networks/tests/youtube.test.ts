import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {youtube} from '../youtube';

describe('Social networks > youtube', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.youtube.com/channel/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when using the short url', () => {
    const mockUncommonUrl = `https://youtu.be/c/${mockGenericUser}`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when leading path is absent', () => {
    const mockUncommonUrl = `https://youtube.com/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(youtube.id);
    expect(user).toBe(mockGenericUser);
  });
});
