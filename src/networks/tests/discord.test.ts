import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {discord} from '../discord';

describe('Social networks > discord', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.discordapp.com/users/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(discord.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(discord.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when leading path is absent', () => {
    const mockUncommonUrl = `https://discordapp.com/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(discord.id);
    expect(user).toBe(mockGenericUser);
  });
});
