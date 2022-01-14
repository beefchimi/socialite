import {allSocialNetworks} from '../data';
import * as networks from '../networks';
import {Socialite} from '../socialite';
import type {SocialProfile} from '../types';

describe('Socialite > social networks', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockUserName = '~f00+96%Hum@n_123-!';

  describe('behance', () => {
    const mockCommonUrl = `https://www.behance.net/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.behance.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.behance.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('dev_to', () => {
    const mockCommonUrl = `https://www.dev.to/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.devto.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.devto.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('discord', () => {
    const mockCommonUrl = `https://www.discordapp.com/users/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.discord.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.discord.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when leading path is absent', () => {
      const mockUncommonUrl = `https://discordapp.com/${mockUserName}/`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.discord.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('dribbble', () => {
    const mockCommonUrl = `https://www.dribbble.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.dribbble.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.dribbble.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('exercism', () => {
    const mockCommonUrl = `https://www.exercism.io/profiles/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.exercism.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.exercism.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when leading path is absent', () => {
      const mockUncommonUrl = `https://exercism.io/${mockUserName}/`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.exercism.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('facebook', () => {
    const mockCommonUrl = `https://www.facebook.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.facebook.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.facebook.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('github', () => {
    const mockCommonUrl = `https://www.github.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.github.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.github.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('instagram', () => {
    const mockCommonUrl = `https://www.instagram.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.instagram.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.instagram.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('keybase', () => {
    const mockCommonUrl = `https://www.keybase.io/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.keybase.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.keybase.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('linkedin', () => {
    const mockCommonUrl = `https://www.linkedin.com/in/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.linkedin.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.linkedin.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when url is from mobile app', () => {
      const mockUncommonUrl = `https://linkedin.com/mwlite/in/${mockUserName}`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.linkedin.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when leading path is absent', () => {
      const mockUncommonUrl = `https://linkedin.com/${mockUserName}/`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.linkedin.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('medium', () => {
    const mockCommonUrl = `https://www.medium.com/${networks.medium.prefix}${mockUserName}`;

    test('Returns expected `id`, `user`, and `prefix` from common url', () => {
      const {id, user, prefix} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.medium.id);
      expect(user).toBe(mockUserName);
      expect(prefix).toBe(networks.medium.prefix);
    });

    test('Returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user, prefix} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.medium.id);
      expect(user).toBe(mockUserName);
      expect(prefix).toBe(networks.medium.prefix);
    });
  });

  describe('patreon', () => {
    const mockCommonUrl = `https://www.patreon.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.patreon.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.patreon.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('pinterest', () => {
    const mockCommonUrl = `https://www.pinterest.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.pinterest.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.pinterest.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('reddit', () => {
    const mockCommonUrl = `https://www.reddit.com/user/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.reddit.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.reddit.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when leading path is absent', () => {
      const mockUncommonUrl = `https://reddit.com/${mockUserName}/`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.reddit.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('stackoverflow', () => {
    const mockCommonUrl = `https://www.stackoverflow.com/users/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.stackoverflow.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.stackoverflow.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when leading path is absent', () => {
      const mockUncommonUrl = `https://stackoverflow.com/${mockUserName}/`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.stackoverflow.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('telegram', () => {
    const mockCommonUrl = `https://www.telegram.me/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.telegram.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.telegram.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when using the short url', () => {
      const mockUncommonUrl = `https://t.me/${mockUserName}`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.telegram.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('tiktok', () => {
    const mockCommonUrl = `https://www.tiktok.com/${networks.tiktok.prefix}${mockUserName}`;

    test('Returns expected `id`, `user`, and `prefix` from common url', () => {
      const {id, user, prefix} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.tiktok.id);
      expect(user).toBe(mockUserName);
      expect(prefix).toBe(networks.tiktok.prefix);
    });

    test('Returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user, prefix} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.tiktok.id);
      expect(user).toBe(mockUserName);
      expect(prefix).toBe(networks.tiktok.prefix);
    });
  });

  describe('twitch', () => {
    const mockCommonUrl = `https://www.twitch.tv/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.twitch.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.twitch.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('twitter', () => {
    const mockCommonUrl = `https://www.twitter.com/${networks.twitter.prefix}${mockUserName}`;

    test('Returns expected `id`, `user`, and `prefix` from common url', () => {
      const {id, user, prefix} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.twitter.id);
      expect(user).toBe(mockUserName);
      expect(prefix).toBe(networks.twitter.prefix);
    });

    test('Returns expected `id`, `user`, and `prefix` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user, prefix} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.twitter.id);
      expect(user).toBe(mockUserName);
      expect(prefix).toBe(networks.twitter.prefix);
    });
  });

  describe('vimeo', () => {
    const mockCommonUrl = `https://www.vimeo.com/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.vimeo.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.vimeo.id);
      expect(user).toBe(mockUserName);
    });
  });

  describe('yat', () => {
    const mockYat = '🥃🍑💎🌭💔';
    const mockCommonUrl = `https://www.y.at/${mockYat}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.yat.id);
      expect(user).toBe(mockYat);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.yat.id);
      expect(user).toBe(mockYat);
    });
  });

  describe('youtube', () => {
    const mockCommonUrl = `https://www.youtube.com/channel/${mockUserName}`;

    test('Returns expected `id` and `user` from common url', () => {
      const {id, user} = mockSocialite.parseProfile(
        mockCommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.youtube.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` from url with trailing path', () => {
      const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.youtube.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when using the short url', () => {
      const mockUncommonUrl = `https://youtu.be/c/${mockUserName}`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.youtube.id);
      expect(user).toBe(mockUserName);
    });

    test('Returns expected `id` and `user` when leading path is absent', () => {
      const mockUncommonUrl = `https://youtube.com/${mockUserName}/`;
      const {id, user} = mockSocialite.parseProfile(
        mockUncommonUrl,
      ) as SocialProfile;

      expect(id).toBe(networks.youtube.id);
      expect(user).toBe(mockUserName);
    });
  });
});
