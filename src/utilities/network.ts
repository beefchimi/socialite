import {arrayDedupe, typedObjectKeys} from 'beeftools';
import type {
  SocialiteNetwork,
  NetworkSubset,
  SocialiteNetworkProperties,
} from '../types';

export function filterNetworkProperties(
  network: SocialiteNetwork,
  subset: SocialiteNetworkProperties,
) {
  const uniqueProperties = arrayDedupe(subset);
  const keys = typedObjectKeys(network);

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
        {},
      )
    : network;
}
