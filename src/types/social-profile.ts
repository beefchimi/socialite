import type {UrlAnatomy} from './general';
import type {NetworkId, UserName, UserPrefix} from './social-network';

export interface SocialiteProfile {
  id: NetworkId;
  urlGroups: UrlAnatomy;
  originalUrl: string;
  preferredUrl: string;
  appUrl?: string;
  user?: UserName;
  prefix?: UserPrefix;
}

export interface DiscordUrlCriteria {
  tldomain?: UrlAnatomy['tldomain'];
  path?: UrlAnatomy['path'];
  user?: UserName;
}
