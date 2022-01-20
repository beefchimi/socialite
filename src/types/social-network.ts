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
  leadingPath?: string | RegExp;
}

export interface SocialiteNetwork {
  id: NetworkId;
  matcher: NetworkMatcher;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  prefix?: UserPrefix;
}

export type NetworkMap = Map<NetworkId, SocialiteNetwork>;
export type NetworkSubset = Partial<SocialiteNetwork>;

export type SocialiteNetworkProperty = keyof SocialiteNetwork;
export type SocialiteNetworkProperties = SocialiteNetworkProperty[];
