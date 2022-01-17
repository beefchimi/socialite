import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {allSocialiteNetworks} from '../../tests/fixtures';
import {yat} from '../yat';

describe('Social networks > yat', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockYat = '🥃🍑💎🌭💔';
  const mockCommonUrl = `https://www.y.at/${mockYat}`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(yat.id);
    expect(user).toBe(mockYat);
  });

  it('returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(yat.id);
    expect(user).toBe(mockYat);
  });
});
