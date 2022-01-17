import type {BasicUrl, UrlAnatomy} from './general';
import type {SocialNetworkId, UserName, UserPrefix} from './social-network';

export interface SocialiteProfile {
  id: SocialNetworkId;
  urlGroups: UrlAnatomy;
  originalUrl: BasicUrl;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  user?: UserName;
  prefix?: UserPrefix;
}
