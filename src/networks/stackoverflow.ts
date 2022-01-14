import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const stackoverflow: SocialNetwork = {
  id: 'stackoverflow',
  preferredUrl: `https://stackoverflow.com/users/${profileReplacement.user}`,
  matcher: {
    domain: /stackoverflow/,
    user: /^(?:\/users\/)?(?:[/]?\d+)?(?:\/)?([^/]+)/,
  },
};

// Should capture:
// /users/11177720/f00_Uz3r!
// /11177720/f00_Uz3r!/trail-123
// /f00_Uz3r!/123-trail
// /f00_Uz3r!/trail
// f00_Uz3r!
