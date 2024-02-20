import {describe, it, expect} from 'vitest';

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
    const mockShortUrl = `https://youtu.be/c/${mockGenericUser}`;
    const match = mockSocialite.parseProfile(mockShortUrl);

    expect(match).toBe(false);
  });

  it('returns `id` with no `user` when provided an unrecognized leading path', () => {
    const mockUnsupportedUrl = `https://youtube.com/foo/${mockGenericUser}`;
    const match = mockSocialite.parseProfile(
      mockUnsupportedUrl,
    ) as SocialiteProfile;

    expect(match.id).toBe(youtube.id);
    expect(match.user).toBeUndefined();
  });
});
