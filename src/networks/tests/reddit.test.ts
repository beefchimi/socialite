import {allSocialNetworks} from '../../data';
import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {mockGenericUser} from '../../tests/fixtures';
import {reddit} from '../reddit';

describe('Social networks > reddit', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockCommonUrl = `https://www.reddit.com/user/${mockGenericUser}`;

  test('Returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(reddit.id);
    expect(user).toBe(mockGenericUser);
  });

  test('Returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(reddit.id);
    expect(user).toBe(mockGenericUser);
  });

  test('Returns expected `id` and `user` when leading path is absent', () => {
    const mockUncommonUrl = `https://reddit.com/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(reddit.id);
    expect(user).toBe(mockGenericUser);
  });
});
