import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {stackoverflow} from '../stackoverflow';

describe('Social networks > stackoverflow', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.stackoverflow.com/users/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(stackoverflow.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(stackoverflow.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when digits path is present', () => {
    const mockUncommonUrl = `https://stackoverflow.com/users/1234567890/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(stackoverflow.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns `id` with no `user` when provided an unrecognized leading path', () => {
    const mockUnsupportedUrl = `https://stackoverflow.com/foo/${mockGenericUser}`;
    const match = mockSocialite.parseProfile(
      mockUnsupportedUrl,
    ) as SocialiteProfile;

    expect(match.id).toBe(stackoverflow.id);
    expect(match.user).toBeUndefined();
  });
});
