import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {
  allSocialiteNetworks,
  discordValidUrls,
  mockGenericUser,
} from '../../tests/fixtures';
import {discord} from '../discord';

describe('Social networks > discord', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);

  // TODO: We want to resolve these in the future
  // https://github.com/beefchimi/socialite/issues/35
  describe('bogus', () => {
    it('mistakenly returns the first path match for any `discord` url', () => {
      const mockPageSlug = 'about-us-page';
      const mockBogusUrl = `https://www.discord.com/${mockPageSlug}`;

      const {id, user} = mockSocialite.parseProfile(
        mockBogusUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockPageSlug);
    });
  });

  describe('users', () => {
    const mockUsersUrl = `https://www.discordapp.com/users/${mockGenericUser}`;

    it('returns `id` and `user`', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockUsersUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockGenericUser);
    });

    it('omits any trailing path after the first `user` match', () => {
      const mockUsersTrailingUrl = `${mockUsersUrl}/trail-123`;

      const {id, user} = mockSocialite.parseProfile(
        mockUsersTrailingUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockGenericUser);
    });
  });

  describe('channels', () => {
    const mockChannelsUrl = `https://www.discord.com/channels/${mockGenericUser}`;

    it('returns `id` and `user`', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockChannelsUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockGenericUser);
    });

    it('omits any trailing path after the first `user` match', () => {
      const mockChannelsTrailingUrl = `${mockChannelsUrl}/trail-123`;

      const {id, user} = mockSocialite.parseProfile(
        mockChannelsTrailingUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockGenericUser);
    });
  });

  describe('vanity', () => {
    const mockVanityUrl = `https://discord.gg/${mockGenericUser}`;

    it('returns `id` and `user`', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockVanityUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockGenericUser);
    });

    it('omits any trailing path after the first `user` match', () => {
      const mockVanityTrailingUrl = `${mockVanityUrl}/trail-123`;

      const {id, user} = mockSocialite.parseProfile(
        mockVanityTrailingUrl,
      ) as SocialiteProfile;

      expect(id).toBe(discord.id);
      expect(user).toBe(mockGenericUser);
    });
  });

  describe('all variations', () => {
    it('returns `id` and `user`', () => {
      discordValidUrls.forEach(({originalUrl, preferredUrl, user}) => {
        const match = mockSocialite.parseProfile(
          originalUrl,
        ) as SocialiteProfile;

        expect(match.id).toBe(discord.id);
        expect(match.preferredUrl).toBe(preferredUrl);
        expect(match.user).toBe(user);
      });
    });
  });
});
