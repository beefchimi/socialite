import type {BasicUrl} from './general';
import type {UrlGroupSubset} from './capture';
import type {
  SocialNetworkId,
  SocialNetworkTitle,
  UserName,
  UserPrefix,
} from './social-network';

export interface SocialProfile {
  id: SocialNetworkId;
  title: SocialNetworkTitle;
  urlGroups: UrlGroupSubset;
  originalUrl: BasicUrl;
  preferredUrl: BasicUrl;
  appUrl?: BasicUrl;
  user?: UserName;
  prefix?: UserPrefix;
}
