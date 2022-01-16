import {profileReplacement, urlRegExp} from '../capture';
import type {BasicUrl, UrlGroupSubset, ParsedUrlGroups} from '../types';
import {filterNullishValuesFromObject} from './general';

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
  // NOTE: Technically, a single `/` isn't a condition that will be met,
  // since `tldomain` or `port` will capture that character.
  // But, this condition may be relevant in the future.
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
  const matched = url.trim().match(urlRegExp);

  if (!matched?.groups) {
    return null;
  }

  return sanitizeUrlGroups(matched.groups);
}

export function getUrlWithSubstitutions(url: BasicUrl, user = '', prefix = '') {
  return url
    .replace(profileReplacement.user, user)
    .replace(profileReplacement.prefix, prefix);
}
