import {defaultSocialiteNetworks} from './data';
import {defaultUserMatcher, schemeRegExp} from './capture';

import {MatchUserSource} from './types';
import type {
  NetworkMap,
  ParsedUrlGroups,
  SocialiteProfile,
  SocialiteNetwork,
  SocialiteNetworkProperties,
  UrlAnatomy,
} from './types';
import {
  filterNetworkProperties,
  getDiscordPreferredUrl,
  getUrlGroups,
  getUrlWithSubstitutions,
} from './utilities';

export class Socialite {
  readonly #networks: NetworkMap;

  constructor(customNetworks: SocialiteNetwork[] = []) {
    const initialNetworks = customNetworks.length
      ? customNetworks
      : defaultSocialiteNetworks;

    this.#networks = new Map();

    initialNetworks.forEach((network) => this.addNetwork(network));
  }

  hasNetwork(id = '') {
    return this.#networks.has(id);
  }

  addNetwork(network: SocialiteNetwork, overwrite = false) {
    return !overwrite && this.hasNetwork(network.id)
      ? false
      : this.#networks.set(network.id, network);
  }

  removeNetwork(id = '') {
    return this.#networks.delete(id);
  }

  emptyNetworks() {
    this.#networks.clear();
  }

  getNetwork(id = '') {
    return this.#networks.get(id);
  }

  getAllNetworks(subset?: SocialiteNetworkProperties) {
    return [...this.#networks.values()].map((network) =>
      subset ? filterNetworkProperties(network, subset) : network,
    );
  }

  getNetworkFromDomain(domain = '') {
    let matchedNetwork: SocialiteNetwork | undefined;

    for (const [_id, network] of this.#networks) {
      const match = new RegExp(network.matcher.domain).test(domain);

      if (match) {
        matchedNetwork = network;
        break;
      }
    }

    return matchedNetwork;
  }

  getPreferredUrl(id = '', user = '') {
    if (!this.hasNetwork(id)) return false;

    // BUG: TypeScript doesn't understand that we have
    // returned early if the `id` does not exist.
    // https://github.com/beefchimi/socialite/issues/4
    const {preferredUrl, prefix} = this.getNetwork(id) ?? {};

    return getUrlWithSubstitutions(preferredUrl, user, prefix);
  }

  parseUrl(url = '') {
    const groups = getUrlGroups(url);
    return this.#validateUrl(groups) ? groups : false;
  }

  parseProfile(value: string | UrlAnatomy, id = '') {
    const groups = typeof value === 'string' ? this.parseUrl(value) : value;

    if (!groups || (id.length && !this.hasNetwork(id))) return false;

    // BUG: TypeScript thinks that `.get(id)` can return `undefined`.
    // https://github.com/beefchimi/socialite/issues/4
    const targetNetwork = this.hasNetwork(id)
      ? this.getNetwork(id)
      : this.getNetworkFromDomain(groups.domain);

    if (!targetNetwork) return false;

    const minResult = this.#getMinimumResult(
      targetNetwork,
      groups,
      typeof value === 'string' ? value : undefined,
    );

    // TODO: This logic should be improved if we ever want to
    // support addition `userSource` values.
    // https://github.com/beefchimi/socialite/issues/2
    const useSubdomain =
      targetNetwork.matcher.userSource === MatchUserSource.Subdomain;
    const userSource = useSubdomain ? groups.subdomain : groups.path;

    if (!userSource || Boolean(!useSubdomain && groups.path === '/')) {
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

    // TODO: This could be where we parse for an exact match of
    // channel vs user vs etc and perform a replacement.
    const leadingPath =
      matchedUser.length > 1 && targetNetwork.leadingPath
        ? getLeadingPathRepalcement(targetNetwork.leadingPath)
        : null;

    // Grab the last "match", since its common for `.match()`
    // to include the full string as its first "match".
    const user = matchedUser
      ? matchedUser[matchedUser.length - 1].replace(prefix ?? '', '')
      : undefined;

    if (!user) return minResult;

    // TODO: Resolve this special condition
    // https://github.com/beefchimi/socialite/issues/35
    const preferredUrl =
      targetNetwork.id === 'discord'
        ? getDiscordPreferredUrl({
            tldomain: minResult.urlGroups.tldomain,
            path: minResult.urlGroups.path,
            user,
          })
        : getUrlWithSubstitutions(targetNetwork.preferredUrl, user, prefix);

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

  fixUrlScheme(url = '') {
    return schemeRegExp.test(url) ? url : `https://${url}`;
  }

  mergeGroupsToUrl(groups: UrlAnatomy) {
    const orderedValues = [
      groups.scheme,
      groups.subdomain,
      groups.domain,
      groups.tldomain,
      groups.port,
      groups.path,
      groups.parameters,
      groups.anchor,
    ];

    return orderedValues.filter((value) => value !== undefined).join('');
  }

  #validateUrl(groups?: ParsedUrlGroups): groups is UrlAnatomy {
    const {domain, tldomain} = groups ?? {};
    return Boolean(domain?.length && tldomain?.length);
  }

  #getMinimumResult(
    network: SocialiteNetwork,
    groups: UrlAnatomy,
    url = '',
  ): SocialiteProfile {
    const originalUrl = url.length ? url : this.mergeGroupsToUrl(groups);

    return {
      id: network.id,
      urlGroups: groups,
      originalUrl,
      preferredUrl: getUrlWithSubstitutions(network.preferredUrl),
      ...(network.appUrl
        ? {appUrl: getUrlWithSubstitutions(network.appUrl)}
        : {}),
    };
  }
}
