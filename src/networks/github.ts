import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const github: SocialiteNetwork = {
  id: 'github',
  preferredUrl: `https://github.com/${profileReplacement.user}`,
  matcher: {
    domain: /github/,
  },
};
