import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const exercism: SocialiteNetwork = {
  id: 'exercism',
  preferredUrl: `https://exercism.io/profiles/${profileReplacement.user}`,
  matcher: {
    domain: /exercism/,
    user: /^(?:\/profiles\/)([^/]+)/,
  },
};
