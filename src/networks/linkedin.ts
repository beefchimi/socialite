import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const linkedin: SocialNetwork = {
  id: 'linkedin',
  preferredUrl: `https://linkedin.com/in/${profileReplacement.user}`,
  appUrl: `https://linkedin.com/mwlite/in/${profileReplacement.user}`,
  matcher: {
    domain: /linkedin/,
    user: /^(?:\/mwlite\/)?(?:[/]?in\/)?(?:\/)?([^/]+)/,
  },
};

// Should pass:
// /in/f00_Uz3r!
// /in/f00_Uz3r!/trail-123
// /mwlite/in/f00_Uz3r!/123-trail
// /f00_Uz3r!/trail-123
// f00_Uz3r!
