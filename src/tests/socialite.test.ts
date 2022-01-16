import {defaultSocialNetworks} from '../data';
import {Socialite} from '../socialite';
import type {SocialNetwork} from '../types';
import {mockCustomNetworks} from './fixtures';

describe('Socialite class instance', () => {
  it('instantiates a Socialite instance', () => {
    const mockSocialite = new Socialite();
    expect(mockSocialite).toBeInstanceOf(Socialite);
  });

  it('contains the default networks', () => {
    const mockSocialite = new Socialite();
    expect(mockSocialite.getNetworks()).toStrictEqual(defaultSocialNetworks);
  });

  it('constructor argument overwrites the default networks', () => {
    const mockSocialite = new Socialite(mockCustomNetworks);
    expect(mockSocialite.getNetworks()).toStrictEqual(mockCustomNetworks);
  });

  it('constructor argument ignores an empty array', () => {
    const mockNetworks: SocialNetwork[] = [];
    const mockSocialite = new Socialite(mockNetworks);

    expect(mockSocialite.getNetworks()).toStrictEqual(defaultSocialNetworks);
  });
});
