import {defaultSocialiteNetworks} from '../data';
import {Socialite} from '../socialite';
import type {
  SocialNetwork,
  NetworkMap,
  SocialNetworkSubset,
  SocialNetworkProperties,
} from '../types';
import {mockCustomNetworks} from './fixtures';

describe('Socialite network methods', () => {
  describe('getNetworks() > subset', () => {
    it('returns only the properties requested', () => {
      const mockSubset: SocialNetworkProperties = ['preferredUrl', 'matcher'];
      const mockSocialite = new Socialite();

      const networks = mockSocialite.getNetworks(mockSubset);

      const defaultFirstNetwork = defaultSocialiteNetworks[0];
      const defaultLastNetwork =
        defaultSocialiteNetworks[defaultSocialiteNetworks.length - 1];

      const firstNetworkSubset = networks[0];
      const defaultFirstNetworkSubset = {
        preferredUrl: defaultFirstNetwork.preferredUrl,
        matcher: defaultFirstNetwork.matcher,
      };

      const lastNetworkSubset = networks[networks.length - 1];
      const defaultLastNetworkSubset = {
        preferredUrl: defaultLastNetwork.preferredUrl,
        matcher: defaultLastNetwork.matcher,
      };

      expect(firstNetworkSubset).toStrictEqual(defaultFirstNetworkSubset);
      expect(lastNetworkSubset).toStrictEqual(defaultLastNetworkSubset);
    });
  });

  describe('hasNetwork()', () => {
    it('returns `true` when requesting a default network', () => {
      const mockSocialite = new Socialite();
      expect(mockSocialite.hasNetwork('facebook')).toBe(true);
    });

    it('returns `true` when requesting a non-default network that has been added', () => {
      const mockSocialite = new Socialite(mockCustomNetworks);
      expect(mockSocialite.hasNetwork('foo')).toBe(true);
    });

    it('returns `false` when requesting a non-default network that has not been added', () => {
      const mockSocialite = new Socialite();
      expect(mockSocialite.hasNetwork('foo')).toBe(false);
    });
  });

  describe('addNetwork()', () => {
    it('returns the full network Map when an individual network is successfully added', () => {
      const mockNetwork = mockCustomNetworks[0];
      const mockSocialite = new Socialite();

      expect(mockSocialite.hasNetwork('foo')).toBe(false);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork);

      expect(mockSocialite.hasNetwork('foo')).toBe(true);
      expect(addedNetwork).toBeInstanceOf(Map);

      const networkKeysFromMap = [...(addedNetwork as NetworkMap).keys()];
      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getNetworks(),
      );

      expect(networkKeysFromMap).toStrictEqual(networkKeysFromObjects);
      expect(networkKeysFromMap).toHaveLength(
        defaultSocialiteNetworks.length + 1,
      );
    });

    it('does not overwrite an existing network by default', () => {
      const mockNetwork: SocialNetwork = {
        ...defaultSocialiteNetworks[0],
        preferredUrl: 'overwritten',
      };

      const mockSocialite = new Socialite();
      const initialNetworks = mockSocialite.getNetworks();

      expect(initialNetworks[0]).toBe(defaultSocialiteNetworks[0]);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork);
      expect(addedNetwork).toBe(false);

      const updatedNetworks = mockSocialite.getNetworks();

      expect(updatedNetworks[0]).toBe(defaultSocialiteNetworks[0]);
      expect(updatedNetworks[0]).not.toBe(mockNetwork);
    });

    it('overwrites an existing network when `overwrite` is `true`', () => {
      const mockNetwork: SocialNetwork = {
        ...defaultSocialiteNetworks[0],
        preferredUrl: 'overwritten',
      };

      const mockSocialite = new Socialite();
      const initialNetworks = mockSocialite.getNetworks();

      expect(initialNetworks[0]).toBe(defaultSocialiteNetworks[0]);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork, true);
      const updatedNetworks = mockSocialite.getNetworks();

      expect(updatedNetworks[0]).not.toBe(defaultSocialiteNetworks[0]);
      expect(updatedNetworks[0]).toBe(mockNetwork);

      const networkKeysFromMap = [...(addedNetwork as NetworkMap).keys()];
      expect(networkKeysFromMap).toHaveLength(defaultSocialiteNetworks.length);
    });
  });

  describe('removeNetwork()', () => {
    it('removes the requested network and returns `true`', () => {
      const mockRemovedId = defaultSocialiteNetworks[0].id;
      const mockSocialite = new Socialite();

      expect(mockSocialite.hasNetwork('facebook')).toBe(true);

      const removedNetwork = mockSocialite.removeNetwork(mockRemovedId);

      expect(removedNetwork).toBe(true);
      expect(mockSocialite.hasNetwork('facebook')).toBe(false);

      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getNetworks(),
      );

      expect(networkKeysFromObjects).toHaveLength(
        defaultSocialiteNetworks.length - 1,
      );
    });

    it('returns `false` when requesting a network that does not exist', () => {
      const mockRemovedId = 'baz';
      const mockSocialite = new Socialite();

      expect(mockSocialite.hasNetwork(mockRemovedId)).toBe(false);

      const removedNetwork = mockSocialite.removeNetwork(mockRemovedId);

      expect(removedNetwork).toBe(false);
      expect(mockSocialite.hasNetwork(mockRemovedId)).toBe(false);

      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getNetworks(),
      );

      expect(networkKeysFromObjects).toHaveLength(
        defaultSocialiteNetworks.length,
      );
    });
  });

  describe('emptyNetwork()', () => {
    it('completely empties the network Map', () => {
      const mockSocialite = new Socialite();

      const initialNetworks = mockSocialite.getNetworks();
      expect(initialNetworks).toHaveLength(defaultSocialiteNetworks.length);

      mockSocialite.emptyNetworks();

      const updatedNetworks = mockSocialite.getNetworks();
      expect(updatedNetworks).toHaveLength(0);
    });
  });
});

function filterNetworkIds(networks: SocialNetworkSubset[]) {
  // BUG: TypeScript thinks `undefined` could be in the array.
  // https://github.com/beefchimi/socialite/issues/8
  return networks.map(({id}) => id).filter(Boolean);
}
