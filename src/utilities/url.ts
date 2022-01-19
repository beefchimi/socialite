import {profileReplacement, urlRegExp, schemeRegExp} from '../capture';
import type {
  BasicUrl,
  UrlGroupSubset,
  UrlMinCriteria,
  ParsedUrlGroups,
} from '../types';
import {filterNullishValuesFromObject} from './general';

export function buildUrlFromGroups(groups: UrlMinCriteria): BasicUrl {
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

export function fixUrlWithoutScheme(url: BasicUrl) {
  const hasScheme = schemeRegExp.test(url);
  return hasScheme ? url : `https://${url}`;
}

function updateGroupsWithSubdomain(groups: UrlGroupSubset): UrlGroupSubset {
  const {domain} = groups;

  let updatedSubdomain: UrlGroupSubset['subdomain'];
  let updatedDomain: UrlGroupSubset['domain'];

  if (domain) {
    const lastDot = domain.lastIndexOf('.');
    const bypass = lastDot === -1;

    updatedSubdomain = bypass ? undefined : domain.slice(0, lastDot + 1);
    updatedDomain = bypass ? undefined : domain.slice(lastDot + 1);
  }

  return {
    ...groups,
    ...(updatedSubdomain ? {subdomain: updatedSubdomain} : {}),
    ...(updatedDomain ? {domain: updatedDomain} : {}),
  };
}

export function getUrlGroups(url: BasicUrl): ParsedUrlGroups {
  const matched = url.trim().match(urlRegExp);

  if (!matched?.groups) {
    return null;
  }

  const filtered = filterNullishValuesFromObject<UrlGroupSubset>(
    matched.groups,
  );

  return updateGroupsWithSubdomain(filtered);
}

export function getUrlWithSubstitutions(url: BasicUrl, user = '', prefix = '') {
  return url
    .replace(profileReplacement.user, user)
    .replace(profileReplacement.prefix, prefix);
}
