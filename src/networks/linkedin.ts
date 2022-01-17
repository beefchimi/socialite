import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const linkedin: SocialiteNetwork = {
  id: 'linkedin',
  preferredUrl: `https://linkedin.com/in/${profileReplacement.user}`,
  appUrl: `https://linkedin.com/mwlite/in/${profileReplacement.user}`,
  matcher: {
    domain: /linkedin/,
    user: /^(?:\/mwlite\/)?(?:[/]?in\/)?(?:\/)?([^/]+)/,
  },
};
