import type {
  SocialNetwork,
  NetworkSubset,
  SocialiteNetworkProperties,
} from '../types';

export function filterNetworkProperties(
  network: SocialNetwork,
  subset: SocialiteNetworkProperties,
) {
  const uniqueProperties: SocialiteNetworkProperties = [...new Set(subset)];
  const keys = Object.keys(network) as SocialiteNetworkProperties;

  return uniqueProperties.length
    ? keys.reduce<NetworkSubset>(
        (filtered, property) =>
          uniqueProperties.includes(property)
            ? {
                ...filtered,
                // BUG: At the moment, TypeScript seems to think that
                // any `{key: value}` pair is acceptable here.
                // https://github.com/beefchimi/socialite/issues/9
                [property]: network[property],
              }
            : filtered,
        {} as NetworkSubset,
      )
    : network;
}
