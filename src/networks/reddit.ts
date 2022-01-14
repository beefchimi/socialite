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

// Should pass:
// /user/f00_Uz3r!
// /user/f00_Uz3r!/trail-123
// /f00_Uz3r!/123-trail
// f00_Uz3r!
