import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const exercism: SocialNetwork = {
  id: 'exercism',
  preferredUrl: `https://exercism.io/profiles/${profileReplacement.user}`,
  matcher: {
    domain: /exercism/,
    user: /^(?:\/profiles\/)?(?:\/)?([^/]+)/,
  },
};

// Should pass:
// /profiles/f00_Uz3r!
// /profiles/f00_Uz3r!/trail-123
// /f00_Uz3r!/123-trail
// f00_Uz3r!
