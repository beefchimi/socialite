import {allSocialNetworks} from '../../data';
import {Socialite} from '../../socialite';
import type {SocialProfile} from '../../types';
import {yat} from '../yat';

describe('Social networks > yat', () => {
  const mockSocialite = new Socialite(allSocialNetworks);
  const mockYat = '🥃🍑💎🌭💔';
  const mockCommonUrl = `https://www.y.at/${mockYat}`;

  test('Returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialProfile;

    expect(id).toBe(yat.id);
    expect(user).toBe(mockYat);
  });

  test('Returns expected `id` and `user` from url with trailing path', () => {
    const mockUncommonUrl = `${mockCommonUrl}/trail-123`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialProfile;

    expect(id).toBe(yat.id);
    expect(user).toBe(mockYat);
  });
});
