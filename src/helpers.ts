import {urlRegExp} from './capture';
import type {
  BasicUrl,
  UrlAnatomy,
  ParsedUrlGroups,
  SocialNetwork,
  // SocialNetworkMap,
  SocialNetworkProperties,
} from './types';
import {filterNullishValuesFromObject} from './utilities';

type SocialNetworkSubset = Partial<SocialNetwork>;

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

/*
export function getSocialNetworkUnion(networks: SocialNetworkMap) {
  return networks.size ? [...networks.keys()].join('|') : null;
}
*/

export function getUrlGroups(url: BasicUrl): ParsedUrlGroups {
  const matched = url.match(urlRegExp);

  if (matched === null || matched.groups === undefined) {
    return null;
  }

  return filterNullishValuesFromObject<Partial<UrlAnatomy>>(matched.groups);
}
