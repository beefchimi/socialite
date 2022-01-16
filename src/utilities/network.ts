import type {
  SocialNetwork,
  SocialNetworkSubset,
  SocialNetworkProperties,
} from '../types';

export function filterNetworkProperties(
  network: SocialNetwork,
  subset: SocialNetworkProperties,
) {
  const uniqueProperties: SocialNetworkProperties = [...new Set(subset)];
  const keys = Object.keys(network) as SocialNetworkProperties;

  return uniqueProperties.length
    ? keys.reduce<SocialNetworkSubset>(
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
      )
    : network;
}
