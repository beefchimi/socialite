import {BasicUrl} from './general';

// These could be more complex types (ex: enums)
export type SocialNetworkId = string;
export type SocialNetworkTitle = string;

export type UserName = string;
export type UserPrefix = string;

export interface SocialNetworkMatcher {
  domain: string;
  user?: string;
}

export interface SocialNetwork {
  id: SocialNetworkId;
  title: SocialNetworkTitle;
  matcher: SocialNetworkMatcher;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  prefix?: UserPrefix;
}

export type SocialNetworkMap = Map<SocialNetworkId, SocialNetwork>;
export type SocialNetworkSubset = Partial<SocialNetwork>;

export type SocialNetworkProperty = keyof SocialNetwork;
export type SocialNetworkProperties = SocialNetworkProperty[];
