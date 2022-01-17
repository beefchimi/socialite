import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {linkedin} from '../linkedin';

describe('Social networks > linkedin', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.linkedin.com/in/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when url is from mobile app', () => {
    const mockUncommonUrl = `https://linkedin.com/mwlite/in/${mockGenericUser}`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` when leading path is absent', () => {
    const mockUncommonUrl = `https://linkedin.com/${mockGenericUser}/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(linkedin.id);
    expect(user).toBe(mockGenericUser);
  });
});
