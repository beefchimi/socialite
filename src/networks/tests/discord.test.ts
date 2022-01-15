import {allSocialNetworks} from '../../data';
import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {mockGenericUser} from '../../tests/fixtures';
import {discord} from '../discord';

describe('Social networks > discord', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockCommonUrl = `https://www.discordapp.com/users/${mockGenericUser}`;

  test('Returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(discord.id);
    expect(user).toBe(mockGenericUser);
  });

  test('Returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(discord.id);
    expect(user).toBe(mockGenericUser);
  });

  test('Returns expected `id` and `user` when leading path is absent', () => {
    const mockUncommonUrl = `https://discordapp.com/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(discord.id);
    expect(user).toBe(mockGenericUser);
  });
});
