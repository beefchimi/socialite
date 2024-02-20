import {describe, it, expect} from 'vitest';

import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {linkedin} from '../linkedin';

describe('Social networks > linkedin', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.linkedin.com/in/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when provided app url', () => {
    const mockUncommonUrl = `https://linkedin.com/mwlite/${mockGenericUser}`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns `id` with no `user` when provided an unrecognized leading path', () => {
    const mockUnsupportedUrl = `https://linkedin.com/foo/${mockGenericUser}`;
    const match = mockSocialite.parseProfile(
      mockUnsupportedUrl,
    ) as SocialiteProfile;

    expect(match.id).toBe(linkedin.id);
    expect(match.user).toBeUndefined();
  });
});
