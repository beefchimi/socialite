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

export function getUrlWithSubstitutions(url: BasicUrl, user = '', prefix = '') {
  return url
    .replace(profileReplacement.user, user)
    .replace(profileReplacement.prefix, prefix);
}

function updateGroupsWithSubdomain(groups: UrlGroupSubset): UrlGroupSubset {
  const {domain} = groups;

  let updatedSubdomain: UrlGroupSubset['subdomain'];
  let updatedDomain: UrlGroupSubset['domain'];

  if (domain) {
    const lastDot = domain.lastIndexOf('.');
    updatedSubdomain = lastDot === -1 ? undefined : domain.slice(0, lastDot);
    updatedDomain = lastDot === -1 ? undefined : domain.slice(lastDot + 1);
  }

  return {
    ...groups,
    ...(updatedSubdomain ? {subdomain: updatedSubdomain} : {}),
    ...(updatedDomain ? {domain: updatedDomain} : {}),
  };
}

function sanitizePort({port, ...groups}: UrlGroupSubset): UrlGroupSubset {
  return port
    ? {
        ...groups,
        port: port.replace(':', '').replace('/', ''),
      }
    : groups;
}

function sanitizePath({path, ...groups}: UrlGroupSubset): UrlGroupSubset {
  return path && path !== '/'
    ? {
        ...groups,
        path,
      }
    : groups;
}

function sanitizeUrlGroups(groups: UrlGroupSubset): UrlGroupSubset {
  const filtered = filterNullishValuesFromObject<UrlGroupSubset>(groups);
  const updatedWithSubdomain = updateGroupsWithSubdomain(filtered);
  const sanitizedWithPort = sanitizePort(updatedWithSubdomain);

  return sanitizePath(sanitizedWithPort);
}

export function getUrlGroups(url: BasicUrl): ParsedUrlGroups {
  const matched = url.match(urlRegExp);

  if (!matched?.groups) {
    return null;
  }

  return sanitizeUrlGroups(matched.groups);
}
