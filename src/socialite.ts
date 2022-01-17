import {defaultSocialiteNetworks} from './data';
import {defaultUserMatcher} from './capture';

import {MatchUserSource} from './types';
import type {
  BasicUrl,
  ParsedUrlGroups,
  NetworkId,
  SocialiteNetwork,
  NetworkMap,
  SocialiteNetworkProperties,
  SocialiteProfile,
  UrlMinCriteria,
} from './types';
import {
  filterNetworkProperties,
  getUrlGroups,
  getUrlWithSubstitutions,
} from './utilities';

export class Socialite {
  // Since this is a Map, we do not want to expose a getter.
  // That would allow users access to Map methods,
  // which circumvents how we want to control this data.
  private _networks: NetworkMap;

  constructor(customNetworks: SocialiteNetwork[] = []) {
    const initialNetworks = customNetworks.length
      ? customNetworks
      : defaultSocialiteNetworks;

    this._networks = new Map();

    initialNetworks.forEach((network) => this.addNetwork(network));
  }

  hasNetwork(id: NetworkId) {
    return this._networks.has(id);
  }

  addNetwork(network: SocialiteNetwork, overwrite = false) {
    return !overwrite && this.hasNetwork(network.id)
      ? false
      : this._networks.set(network.id, network);
  }

  removeNetwork(id: NetworkId) {
    return this._networks.delete(id);
  }

  emptyNetworks() {
    this._networks.clear();
  }

  getNetworks(subset?: SocialiteNetworkProperties) {
    return [...this._networks.values()].map((network) =>
      subset ? filterNetworkProperties(network, subset) : network,
    );
  }

  parseUrl(url: BasicUrl) {
    const groups = getUrlGroups(url);
    // TODO: https://github.com/beefchimi/socialite/issues/5
    return this.validateUrl(groups) ? (groups as UrlMinCriteria) : false;
  }

  parseProfile(url: BasicUrl, id?: NetworkId): SocialiteProfile | false {
    const matches = this.parseUrl(url);

    if (!matches || (id && !this.hasNetwork(id))) {
      return false;
    }

    // BUG: TypeScript thinks that `.get(id)` can return `undefined`.
    // https://github.com/beefchimi/socialite/issues/4
    const targetNetwork =
      id && this.hasNetwork(id)
        ? this._networks.get(id)
        : this.getNetworkFromDomain(matches.domain);

    if (!targetNetwork) {
      return false;
    }

    const minResult = this.getMinimumResult(targetNetwork, matches, url);

    // TODO: This logic should be improved if we ever want to
    // support addition `userSource` values.
    // https://github.com/beefchimi/socialite/issues/2
    const useSubdomain =
      targetNetwork.matcher.userSource === MatchUserSource.Subdomain;
    const userSource = useSubdomain ? matches.subdomain : matches.path;

    if (!userSource) {
      return minResult;
    }

    const fallbackMatcher = useSubdomain
      ? defaultUserMatcher.subdomain
      : defaultUserMatcher.path;

    const userRegExp = targetNetwork.matcher.user
      ? new RegExp(targetNetwork.matcher.user)
      : fallbackMatcher;

    const prefix = targetNetwork.prefix;
    const matchedUser = userSource.match(userRegExp);
    // Grab the last "match", since its common for `.match()`
    // to include the full string as its first "match".
    const user = matchedUser
      ? matchedUser[matchedUser.length - 1].replace(prefix ?? '', '')
      : undefined;

    if (!user) {
      return minResult;
    }

    const preferredUrl = getUrlWithSubstitutions(
      targetNetwork.preferredUrl,
      user,
      prefix,
    );
    const appUrl = targetNetwork.appUrl
      ? getUrlWithSubstitutions(targetNetwork.appUrl, user, prefix)
      : undefined;

    return {
      ...minResult,
      ...(appUrl ? {appUrl} : {}),
      ...(prefix ? {prefix} : {}),
      preferredUrl,
      user,
    };
  }

  private validateUrl(groups: ParsedUrlGroups) {
    // TODO: We need a way to tell TypeScript that, if this returns `true`,
    // we for sure have an object with `domain` and `tldomain`.
    // https://github.com/beefchimi/socialite/issues/5
    return Boolean(groups?.domain && groups?.tldomain);
  }

  private getNetworkFromDomain(domain: string) {
    let matchedNetwork: SocialiteNetwork | undefined;

    for (const [_id, network] of this._networks) {
      const match = new RegExp(network.matcher.domain).test(domain);

      if (match) {
        matchedNetwork = network;
        break;
      }
    }

    return matchedNetwork;
  }

  private getMinimumResult(
    network: SocialiteNetwork,
    matches: UrlMinCriteria,
    url: BasicUrl,
  ): SocialiteProfile {
    return {
      id: network.id,
      urlGroups: matches,
      originalUrl: url,
      preferredUrl: getUrlWithSubstitutions(network.preferredUrl),
      ...(network.appUrl
        ? {appUrl: getUrlWithSubstitutions(network.appUrl)}
        : {}),
    };
  }
}
