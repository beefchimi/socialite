import {BasicUrl} from './general';

// TODO: This could be a more complex type (ex: enums)
// https://github.com/beefchimi/socialite/issues/3
export type SocialNetworkId = string;
export type UserName = string;
export type UserPrefix = string;

export enum MatchUserSource {
  // TODO: Future social networks could potentially
  // store user info in the `parameters` (or otherwise).
  // https://github.com/beefchimi/socialite/issues/2
  Subdomain = 'subdomain',
  Path = 'path',
}

export interface SocialNetworkMatcher {
  domain: string | RegExp;
  userSource?: MatchUserSource;
  user?: string | RegExp;
}

export interface SocialNetwork {
  id: SocialNetworkId;
  matcher: SocialNetworkMatcher;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  prefix?: UserPrefix;
}

export type SocialNetworkMap = Map<SocialNetworkId, SocialNetwork>;
export type SocialNetworkSubset = Partial<SocialNetwork>;

export type SocialNetworkProperty = keyof SocialNetwork;
export type SocialNetworkProperties = SocialNetworkProperty[];
