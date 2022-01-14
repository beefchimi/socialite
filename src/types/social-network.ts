import {BasicUrl} from './general';

// TODO: This could be a more complex type (ex: enums)
export type SocialNetworkId = string;
export type UserName = string;
export type UserPrefix = string;

export interface SocialNetworkMatcher {
  domain: string | RegExp;
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
