import {describe, it, expect} from 'vitest';

import {Socialite} from '../../socialite';
import type {SocialiteProfile} from '../../types';
import {allSocialiteNetworks} from '../../tests/fixtures';
import {substack} from '../substack';

describe('Social networks > substack', () => {
  const mockSocialite = new Socialite(allSocialiteNetworks);
  const mockSubdomainUser = 'UserName';
  const mockCommonUrl = `https://${mockSubdomainUser}.substack.com/`;

  it('returns expected `id` and `user` from common url', () => {
    const {id, user} = mockSocialite.parseProfile(
      mockCommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(substack.id);
    expect(user).toBe(mockSubdomainUser);
  });

  it('returns expected `id` and `user` from url with multiple subdomains', () => {
    const mockUncommonUrl = `https://${mockSubdomainUser}.trail-123.substack.com/`;
    const {id, user} = mockSocialite.parseProfile(
      mockUncommonUrl,
    ) as SocialiteProfile;

    expect(id).toBe(substack.id);
    expect(user).toBe(mockSubdomainUser);
  });
});
