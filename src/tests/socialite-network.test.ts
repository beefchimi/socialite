import {defaultSocialNetworks} from '../data';
import {Socialite} from '../socialite';
import type {
  SocialNetwork,
  SocialNetworkMap,
  SocialNetworkSubset,
  SocialNetworkProperties,
} from '../types';
import {mockCustomNetworks} from './fixtures';

describe('Socialite network methods', () => {
  describe('getNetworks() > subset', () => {
    test('Returns only the properties requested', () => {
      const mockSubset: SocialNetworkProperties = ['title', 'preferredUrl'];
      const mockSocialite = new Socialite();

      const networks = mockSocialite.getNetworks(mockSubset);

      const defaultFirstNetwork = defaultSocialNetworks[0];
      const defaultLastNetwork =
        defaultSocialNetworks[defaultSocialNetworks.length - 1];

      const firstNetworkSubset = networks[0];
      const defaultFirstNetworkSubset = {
        title: defaultFirstNetwork.title,
        preferredUrl: defaultFirstNetwork.preferredUrl,
      };

      const lastNetworkSubset = networks[networks.length - 1];
      const defaultLastNetworkSubset = {
        title: defaultLastNetwork.title,
        preferredUrl: defaultLastNetwork.preferredUrl,
      };

      expect(firstNetworkSubset).toEqual(defaultFirstNetworkSubset);
      expect(lastNetworkSubset).toEqual(defaultLastNetworkSubset);
    });
  });

  describe('hasNetwork()', () => {
    test('Returns `true` when requesting a default network', () => {
      const mockSocialite = new Socialite();
      expect(mockSocialite.hasNetwork('facebook')).toBe(true);
    });

    test('Returns `true` when requesting a non-default network that has been added', () => {
      const mockSocialite = new Socialite(mockCustomNetworks);
      expect(mockSocialite.hasNetwork('foo')).toBe(true);
    });

    test('Returns `false` when requesting a non-default network that has not been added', () => {
      const mockSocialite = new Socialite();
      expect(mockSocialite.hasNetwork('foo')).toBe(false);
    });
  });

  describe('addNetwork()', () => {
    test('Returns the full network Map when an individual network is successfully added', () => {
      const mockNetwork = mockCustomNetworks[0];
      const mockSocialite = new Socialite();

      expect(mockSocialite.hasNetwork('foo')).toBe(false);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork);

      expect(mockSocialite.hasNetwork('foo')).toBe(true);
      expect(addedNetwork).toBeInstanceOf(Map);

      const networkKeysFromMap = [...(addedNetwork as SocialNetworkMap).keys()];
      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getNetworks(),
      );

      expect(networkKeysFromMap).toEqual(networkKeysFromObjects);
      expect(networkKeysFromMap).toHaveLength(defaultSocialNetworks.length + 1);
    });

    test('Does not overwrite an existing network by default', () => {
      const mockNetwork: SocialNetwork = {
        ...defaultSocialNetworks[0],
        preferredUrl: 'overwritten',
      };

      const mockSocialite = new Socialite();
      const initialNetworks = mockSocialite.getNetworks();

      expect(initialNetworks[0]).toBe(defaultSocialNetworks[0]);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork);
      expect(addedNetwork).toBe(false);

      const updatedNetworks = mockSocialite.getNetworks();

      expect(updatedNetworks[0]).toBe(defaultSocialNetworks[0]);
      expect(updatedNetworks[0]).not.toBe(mockNetwork);
    });

    test('Overwrites an existing network when `overwrite` is `true`', () => {
      const mockNetwork: SocialNetwork = {
        ...defaultSocialNetworks[0],
        preferredUrl: 'overwritten',
      };

      const mockSocialite = new Socialite();
      const initialNetworks = mockSocialite.getNetworks();

      expect(initialNetworks[0]).toBe(defaultSocialNetworks[0]);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork, true);
      const updatedNetworks = mockSocialite.getNetworks();

      expect(updatedNetworks[0]).not.toBe(defaultSocialNetworks[0]);
      expect(updatedNetworks[0]).toBe(mockNetwork);

      const networkKeysFromMap = [...(addedNetwork as SocialNetworkMap).keys()];
      expect(networkKeysFromMap).toHaveLength(defaultSocialNetworks.length);
    });
  });

  describe('removeNetwork()', () => {
    test('Removes the requested network and returns `true`', () => {
      const mockRemovedId = defaultSocialNetworks[0].id;
      const mockSocialite = new Socialite();

      expect(mockSocialite.hasNetwork('facebook')).toBe(true);

      const removedNetwork = mockSocialite.removeNetwork(mockRemovedId);

      expect(removedNetwork).toBe(true);
      expect(mockSocialite.hasNetwork('facebook')).toBe(false);

      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getNetworks(),
      );

      expect(networkKeysFromObjects).toHaveLength(
        defaultSocialNetworks.length - 1,
      );
    });

    test('Returns `false` when requesting a network that does not exist', () => {
      const mockRemovedId = 'baz';
      const mockSocialite = new Socialite();

      expect(mockSocialite.hasNetwork(mockRemovedId)).toBe(false);

      const removedNetwork = mockSocialite.removeNetwork(mockRemovedId);

      expect(removedNetwork).toBe(false);
      expect(mockSocialite.hasNetwork(mockRemovedId)).toBe(false);

      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getNetworks(),
      );

      expect(networkKeysFromObjects).toHaveLength(defaultSocialNetworks.length);
    });
  });

  describe('emptyNetwork()', () => {
    test('Completely empties the network Map', () => {
      const mockSocialite = new Socialite();

      const initialNetworks = mockSocialite.getNetworks();
      expect(initialNetworks).toHaveLength(defaultSocialNetworks.length);

      mockSocialite.emptyNetworks();

      const updatedNetworks = mockSocialite.getNetworks();
      expect(updatedNetworks).toHaveLength(0);
    });
  });
});

function filterNetworkIds(networks: SocialNetworkSubset[]) {
  // Bug: TypeScript things `undefined` could be in the array.
  return networks.map(({id}) => id).filter(Boolean);
}
