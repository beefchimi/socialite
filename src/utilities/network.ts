import type {
  SocialNetwork,
  SocialNetworkMap,
  SocialNetworkSubset,
  SocialNetworkProperties,
} from '../types';

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
