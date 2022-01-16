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
