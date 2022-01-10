import {BasicUrl} from './general';

// These could be more complex types (ex: enums)
export type SocialNetworkId = string;
export type SocialNetworkTitle = string;

// export type SocialNetworkType = 'default' | 'custom';

export type UserName = string;
export type UserPrefix = string;

export interface SocialNetwork {
  id: SocialNetworkId;
  title: SocialNetworkTitle;
  preferredUrl: BasicUrl;
  overrides?: {[key: string]: string};
  appUrl?: BasicUrl;
  prefix?: UserPrefix;
}

export type SocialNetworkMap = Map<SocialNetworkId, SocialNetwork>;
export type SocialNetworkProperty = keyof SocialNetwork;
export type SocialNetworkProperties = SocialNetworkProperty[];
