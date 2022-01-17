import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks, mockGenericUser} from '../../tests/fixtures';
import {keybase} from '../keybase';

describe('Social networks > keybase', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockCommonUrl = `https://www.keybase.io/${mockGenericUser}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(keybase.id);
    expect(user).toBe(mockGenericUser);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(keybase.id);
    expect(user).toBe(mockGenericUser);
  });
});
