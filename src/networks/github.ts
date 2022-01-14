import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const github: SocialNetwork = {
  id: 'github',
  preferredUrl: `https://github.com/${profileReplacement.user}`,
  matcher: {
    domain: /github/,
  },
};
