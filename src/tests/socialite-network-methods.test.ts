import {defaultSocialiteNetworks} from '../data';
import {
  facebook as networkFacebook,
  twitter as networkTwitter,
} from '../networks';
import {Socialite} from '../socialite';
import type {
  SocialiteNetwork,
  NetworkMap,
  NetworkSubset,
  SocialiteNetworkProperties,
} from '../types';
import {mockCustomNetworks, mockGenericUser} from './fixtures';

describe('Socialite network methods', () => {
  describe('hasNetwork()', () => {
    it('returns `true` when requesting a default network', () => {
      const mockSocialite = new Socialite();
      expect(mockSocialite.hasNetwork(networkFacebook.id)).toBe(true);
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
        mockSocialite.getAllNetworks(),
      );

      expect(networkKeysFromMap).toStrictEqual(networkKeysFromObjects);
      expect(networkKeysFromMap).toHaveLength(
        defaultSocialiteNetworks.length + 1,
      );
    });

    it('does not overwrite an existing network by default', () => {
      const mockNetwork: SocialiteNetwork = {
        ...defaultSocialiteNetworks[0],
        preferredUrl: 'overwritten',
      };

      const mockSocialite = new Socialite();
      const initialNetworks = mockSocialite.getAllNetworks();

      expect(initialNetworks[0]).toBe(defaultSocialiteNetworks[0]);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork);
      expect(addedNetwork).toBe(false);

      const updatedNetworks = mockSocialite.getAllNetworks();

      expect(updatedNetworks[0]).toBe(defaultSocialiteNetworks[0]);
      expect(updatedNetworks[0]).not.toBe(mockNetwork);
    });

    it('overwrites an existing network when `overwrite` is `true`', () => {
      const mockNetwork: SocialiteNetwork = {
        ...defaultSocialiteNetworks[0],
        preferredUrl: 'overwritten',
      };

      const mockSocialite = new Socialite();
      const initialNetworks = mockSocialite.getAllNetworks();

      expect(initialNetworks[0]).toBe(defaultSocialiteNetworks[0]);

      const addedNetwork = mockSocialite.addNetwork(mockNetwork, true);
      const updatedNetworks = mockSocialite.getAllNetworks();

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

      expect(mockSocialite.hasNetwork(networkFacebook.id)).toBe(true);

      const removedNetwork = mockSocialite.removeNetwork(mockRemovedId);

      expect(removedNetwork).toBe(true);
      expect(mockSocialite.hasNetwork(networkFacebook.id)).toBe(false);

      const networkKeysFromObjects = filterNetworkIds(
        mockSocialite.getAllNetworks(),
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
        mockSocialite.getAllNetworks(),
      );

      expect(networkKeysFromObjects).toHaveLength(
        defaultSocialiteNetworks.length,
      );
    });
  });

  describe('emptyNetwork()', () => {
    it('completely empties the network Map', () => {
      const mockSocialite = new Socialite();

      const initialNetworks = mockSocialite.getAllNetworks();
      expect(initialNetworks).toHaveLength(defaultSocialiteNetworks.length);

      mockSocialite.emptyNetworks();

      const updatedNetworks = mockSocialite.getAllNetworks();
      expect(updatedNetworks).toHaveLength(0);
    });
  });

  describe('getNetwork()', () => {
    it('returns the requested network', () => {
      const mockSocialite = new Socialite();

      const network = mockSocialite.getNetwork(networkFacebook.id);
      expect(network).toStrictEqual(networkFacebook);
    });

    it('returns `undefined` if the network does not exist', () => {
      const mockSocialite = new Socialite();

      const network = mockSocialite.getNetwork('foo');
      expect(network).toBeUndefined();
    });
  });

  describe('getAllNetworks()', () => {
    it('returns everything by default', () => {
      const mockSocialite = new Socialite();
      const networks = mockSocialite.getAllNetworks();

      // TODO: There are likely better patterns for looping
      // over assertings in Jest / Vitest.
      networks.forEach((network, index) => {
        expect(network).toStrictEqual(defaultSocialiteNetworks[index]);
      });
    });

    it('returns only the properties requested', () => {
      const mockSubset: SocialiteNetworkProperties = [
        'preferredUrl',
        'matcher',
      ];
      const mockSocialite = new Socialite();

      const networks = mockSocialite.getAllNetworks(mockSubset);

      const defaultNetworkSubsets: NetworkSubset[] =
        defaultSocialiteNetworks.map(({preferredUrl, matcher}) => ({
          preferredUrl,
          matcher,
        }));

      // TODO: There are likely better patterns for looping
      // over assertings in Jest / Vitest.
      networks.forEach((network, index) => {
        expect(network).toStrictEqual(defaultNetworkSubsets[index]);
      });
    });
  });

  describe('getPreferredUrl()', () => {
    it('returns the `preferredUrl` with only `user` replaced', () => {
      const mockSocialite = new Socialite();

      const preferredUrl = mockSocialite.getPreferredUrl(
        networkFacebook.id,
        mockGenericUser,
      );
      expect(preferredUrl).toBe(`https://facebook.com/${mockGenericUser}`);
    });

    it('returns the `preferredUrl` with both `user` and `prefix` replaced', () => {
      const mockSocialite = new Socialite();

      const preferredUrl = mockSocialite.getPreferredUrl(
        networkTwitter.id,
        mockGenericUser,
      );
      expect(preferredUrl).toBe(`https://twitter.com/@${mockGenericUser}`);
    });

    it('returns `false` if the network does not exist', () => {
      const mockSocialite = new Socialite();

      const network = mockSocialite.getPreferredUrl('foo');
      expect(network).toBe(false);
    });
  });
});

function filterNetworkIds(networks: NetworkSubset[]) {
  // BUG: TypeScript thinks `undefined` could be in the array.
  // https://github.com/beefchimi/socialite/issues/8
  return networks.map(({id}) => id).filter(Boolean);
}
