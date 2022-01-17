import type {BasicUrl, UrlAnatomy} from './general';
import type {NetworkId, UserName, UserPrefix} from './social-network';

export interface SocialiteProfile {
  id: NetworkId;
  urlGroups: UrlAnatomy;
  originalUrl: BasicUrl;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  user?: UserName;
  prefix?: UserPrefix;
}
