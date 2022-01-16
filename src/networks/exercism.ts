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
