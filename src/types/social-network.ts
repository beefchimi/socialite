import {BasicUrl} from './general';

export type NetworkId = string;
export type UserName = string;
export type UserPrefix = string;

export enum MatchUserSource {
  // TODO: Future social networks could potentially
  // store user info in the `parameters` (or otherwise).
  // https://github.com/beefchimi/socialite/issues/2
  Subdomain = 'subdomain',
  Path = 'path',
}

export interface NetworkMatcher {
  domain: string | RegExp;
  userSource?: MatchUserSource;
  user?: string | RegExp;
}

export interface SocialNetwork {
  id: NetworkId;
  matcher: NetworkMatcher;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  prefix?: UserPrefix;
}

export type NetworkMap = Map<NetworkId, SocialNetwork>;
export type NetworkSubset = Partial<SocialNetwork>;

export type SocialNetworkProperty = keyof SocialNetwork;
export type SocialNetworkProperties = SocialNetworkProperty[];
