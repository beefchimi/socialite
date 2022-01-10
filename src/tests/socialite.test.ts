import {DEFAULT_SOCIAL_NETWORKS} from '../data';
import {Socialite} from '../socialite';
import type {SocialNetwork} from '../types';
import {customNetworks} from './fixtures';

describe('Socialite class instance', () => {
  test('Instantiates a Socialite instance', () => {
    const mockSocialite = new Socialite();
    expect(mockSocialite).toBeInstanceOf(Socialite);
  });

  test('Contains the default networks', () => {
    const mockSocialite = new Socialite();
    expect(mockSocialite.getNetworks()).toEqual(DEFAULT_SOCIAL_NETWORKS);
  });

  test('Constructor argument overwrites the default networks', () => {
    const mockSocialite = new Socialite(customNetworks);
    expect(mockSocialite.getNetworks()).toEqual(customNetworks);
  });

  test('Constructor argument ignores an empty array', () => {
    const mockNetworks: SocialNetwork[] = [];
    const mockSocialite = new Socialite(mockNetworks);

    expect(mockSocialite.getNetworks()).toEqual(DEFAULT_SOCIAL_NETWORKS);
  });
});
