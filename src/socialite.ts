import {DEFAULT_SOCIAL_NETWORKS} from './data';

import {filterNetworkProperties, getUrlGroups} from './helpers';
import type {
  BasicUrl,
  ParsedUrlGroups,
  SocialNetworkId,
  SocialNetwork,
  SocialNetworkMap,
  SocialNetworkProperties,
  // SocialProfile,
} from './types';

export class Socialite {
  // Since this is a Map, we do not want to expose a getter.
  // That would allow users access to Map methods,
  // which circumvents how we want to control this data.
  private _networks: SocialNetworkMap;

  constructor(customNetworks: SocialNetwork[] = []) {
    const networks = customNetworks.length
      ? customNetworks
      : DEFAULT_SOCIAL_NETWORKS;

    this._networks = new Map();

    networks.forEach((network) => this._networks.set(network.id, network));
  }

  parseUrl(url: BasicUrl) {
    const groups = getUrlGroups(url);
    const isValid = this.validateUrl(groups);

    if (!isValid) {
      return null;
    }

    return groups;
  }

  /*
  parseProfile(url: BasicUrl, id?: SocialNetworkId): SocialProfile {
    const matches = this.parseUrl(url);

    return {
      network: {
        id: 'facebook',
        title: 'Facebook',
      },
      handle: {
        prefix: ''
        username: '',
      },
      url: {
        local: 'en',
        original: '',
        preferred: '',
        app: '',
      }
      urlGroups: matches,
    }
  }
  */

  getNetworks(subset?: SocialNetworkProperties) {
    return [...this._networks.values()].map((network) =>
      subset ? filterNetworkProperties(network, subset) : network,
    );
  }

  hasNetwork(id: SocialNetworkId) {
    return this._networks.has(id);
  }

  addNetwork(network: SocialNetwork, overwrite = false) {
    return !overwrite && this._networks.has(network.id)
      ? false
      : this._networks.set(network.id, network);
  }

  removeNetwork(id: SocialNetworkId) {
    return this._networks.delete(id);
  }

  emptyNetworks() {
    this._networks.clear();
  }

  private validateUrl(groups: ParsedUrlGroups) {
    // `domains` and `tldomain` are minimum requirements for a valid URL.
    return Boolean(groups && groups.domain && groups.tldomain);
  }
}
