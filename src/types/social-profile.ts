import type {BasicUrl} from './general';
import type {
  SocialNetworkId,
  SocialNetworkTitle,
  UserName,
  UserPrefix,
} from './social-network';

interface Network {
  id: SocialNetworkId;
  title: SocialNetworkTitle;
}

interface Handle {
  username: UserName;
  prefix?: UserPrefix;
}

interface ProfileUrl {
  original: BasicUrl;
  preferred: BasicUrl;
  app?: BasicUrl;
  local?: string;
}

export interface SocialProfile {
  network: Network;
  handle: Handle;
  url: ProfileUrl;
  // urlGroups: matches,
}

/*
export interface SocialProfile {
  id: SocialNetworkId;
  title: SocialNetworkTitle;
  username: UserName;
  original: BasicUrl;
  url: BasicUrl;
  prefix?: UserPrefix;
  // app?: BasicUrl;
  // locale?: 'en' | 'fr | etc;
  // leadingPath?: string;
  // trailingPath?: string;
  // parameters?: string;
  // anchor?: string;
}
*/
