import {defaultSocialNetworks} from './data';
import {defaultUserMatcher} from './capture';

import {
  filterNetworkProperties,
  getNetworkFromDomain,
  getUrlGroups,
  getUrlWithSubstitutions,
} from './helpers';
import {MatchUserSource} from './types';
import type {
  BasicUrl,
  ParsedUrlGroups,
  SocialNetworkId,
  SocialNetwork,
  SocialNetworkMap,
  SocialNetworkProperties,
  SocialProfile,
  UrlMinCriteria,
} from './types';

export class Socialite {
  // Since this is a Map, we do not want to expose a getter.
  // That would allow users access to Map methods,
  // which circumvents how we want to control this data.
  private _networks: SocialNetworkMap;

  constructor(customNetworks: SocialNetwork[] = []) {
    const networks = customNetworks.length
      ? customNetworks
      : defaultSocialNetworks;

    this._networks = new Map();

    networks.forEach((network) => this.addNetwork(network));
  }

  hasNetwork(id: SocialNetworkId) {
    return this._networks.has(id);
  }

  addNetwork(network: SocialNetwork, overwrite = false) {
    return !overwrite && this.hasNetwork(network.id)
      ? false
      : this._networks.set(network.id, network);
  }

  removeNetwork(id: SocialNetworkId) {
    return this._networks.delete(id);
  }

  emptyNetworks() {
    this._networks.clear();
  }

  getNetworks(subset?: SocialNetworkProperties) {
    return [...this._networks.values()].map((network) =>
      subset ? filterNetworkProperties(network, subset) : network,
    );
  }

  parseUrl(url: BasicUrl) {
    const groups = getUrlGroups(url);
    return this.validateUrl(groups) ? (groups as UrlMinCriteria) : false;
  }

  parseProfile(url: BasicUrl, id?: SocialNetworkId): SocialProfile | false {
    const matches = this.parseUrl(url.trim());

    if (!matches || (id && !this.hasNetwork(id))) {
      return false;
    }

    // TypeScript thinks that `.get(id)` can return `undefined`.
    const targetNetwork =
      id && this.hasNetwork(id)
        ? this._networks.get(id)
        : getNetworkFromDomain(this._networks, matches.domain);

    if (!targetNetwork) {
      return false;
    }

    const minimumResult: SocialProfile = {
      id: targetNetwork.id,
      urlGroups: matches,
      originalUrl: url,
      preferredUrl: getUrlWithSubstitutions(targetNetwork.preferredUrl),
      ...(targetNetwork.appUrl
        ? {appUrl: getUrlWithSubstitutions(targetNetwork.appUrl)}
        : {}),
    };

    const useSubdomain =
      targetNetwork.matcher.userSource === MatchUserSource.Subdomain;
    const userSource = useSubdomain ? matches.subdomain : matches.path;
    const fallbackMatcher = useSubdomain
      ? defaultUserMatcher.subdomain
      : defaultUserMatcher.path;

    if (!userSource) {
      return minimumResult;
    }

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

    const preferredUrl = getUrlWithSubstitutions(
      targetNetwork.preferredUrl,
      user,
      prefix,
    );
    const appUrl = targetNetwork.appUrl
      ? getUrlWithSubstitutions(targetNetwork.appUrl, user, prefix)
      : undefined;

    return user
      ? {
          ...minimumResult,
          ...(appUrl ? {appUrl} : {}),
          ...(prefix ? {prefix} : {}),
          preferredUrl,
          user,
        }
      : minimumResult;
  }

  private validateUrl(groups: ParsedUrlGroups) {
    // `domains` and `tldomain` are minimum requirements for a valid URL.
    // We need a way to tell TypeScript that, if this returns `true`,
    // we for sure have an object with `domain` and `tldomain`
    return Boolean(groups?.domain && groups?.tldomain);
  }
}
