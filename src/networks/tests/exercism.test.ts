import {allSocialNetworks} from '../../data';
import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {mockGenericUser} from '../../tests/fixtures';
import {exercism} from '../exercism';

describe('Social networks > exercism', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockCommonUrl = `https://www.exercism.io/profiles/${mockGenericUser}`;

  test('Returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(exercism.id);
    expect(user).toBe(mockGenericUser);
  });

  test('Returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(exercism.id);
    expect(user).toBe(mockGenericUser);
  });

  test('Returns expected `id` and `user` when leading path is absent', () => {
    const mockUncommonUrl = `https://exercism.io/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(exercism.id);
    expect(user).toBe(mockGenericUser);
  });
});
