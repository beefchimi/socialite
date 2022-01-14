import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const reddit: SocialNetwork = {
  id: 'reddit',
  preferredUrl: `https://reddit.com/user/${profileReplacement.user}`,
  matcher: {
    domain: /reddit/,
    user: /^(?:\/user\/)?(?:\/)?([^/]+)/,
  },
};
