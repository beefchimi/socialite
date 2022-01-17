import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const reddit: SocialiteNetwork = {
  id: 'reddit',
  preferredUrl: `https://reddit.com/user/${profileReplacement.user}`,
  matcher: {
    domain: /reddit/,
    user: /^(?:\/user\/)?(?:\/)?([^/]+)/,
  },
};
