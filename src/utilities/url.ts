import {profileReplacement, urlRegExp} from '../capture';
import type {BasicUrl, UrlGroupSubset, ParsedUrlGroups} from '../types';
import {filterNullishValuesFromObject} from './general';

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
