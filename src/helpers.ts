import {profileReplacement, urlRegExp} from './capture';
import type {
  BasicUrl,
  UrlGroupSubset,
  ParsedUrlGroups,
  SocialNetwork,
  SocialNetworkMap,
  SocialNetworkSubset,
  SocialNetworkProperties,
} from './types';
import {filterNullishValuesFromObject} from './utilities';

export function filterNetworkProperties(
  network: SocialNetwork,
  subset: SocialNetworkProperties,
) {
  const uniqueProperties: SocialNetworkProperties = [...new Set(subset)];
  const keys = Object.keys(network) as SocialNetworkProperties;

  return keys.reduce<SocialNetworkSubset>(
    (filtered, property) =>
      uniqueProperties.includes(property)
        ? {
            ...filtered,
            // Bug: At the moment, TypeScript seems to think that
            // any `{key: value}` pair is acceptable here.
            [property]: network[property],
          }
        : filtered,
    {} as SocialNetworkSubset,
  );
}

export function getNetworkFromDomain(
  networks: SocialNetworkMap,
  domain: string,
) {
  let matchedNetwork: SocialNetwork | null = null;

  for (const [_id, network] of networks) {
    const match = new RegExp(network.matcher.domain).test(domain);

    if (match) {
      matchedNetwork = network;
      break;
    }
  }

  return matchedNetwork;
}

export function getUrlGroups(url: BasicUrl): ParsedUrlGroups {
  const matched = url.match(urlRegExp);

  if (!matched?.groups) {
    return null;
  }

  const filtered = filterNullishValuesFromObject<UrlGroupSubset>(
    matched.groups,
  );

  let subdomain: UrlGroupSubset['subdomain'];
  let domain: UrlGroupSubset['domain'];

  if (filtered.domain) {
    const lastDot = filtered.domain.lastIndexOf('.');
    subdomain = lastDot === -1 ? undefined : filtered.domain.slice(0, lastDot);
    domain = lastDot === -1 ? undefined : filtered.domain.slice(lastDot + 1);
  }

  let port: UrlGroupSubset['port'];

  if (filtered.port) {
    port = filtered.port.replace(':', '').replace('/', '');
  }

  if (filtered.path === '/') {
    delete filtered.path;
  }

  return {
    ...filtered,
    ...(subdomain ? {subdomain} : {}),
    ...(domain ? {domain} : {}),
    ...(port ? {port} : {}),
  };
}

export function getUrlWithSubstitutions(url: BasicUrl, user = '', prefix = '') {
  return url
    .replace(profileReplacement.user, user)
    .replace(profileReplacement.prefix, prefix);
}
