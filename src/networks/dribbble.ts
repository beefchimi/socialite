import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const dribbble: SocialNetwork = {
  id: 'dribbble',
  preferredUrl: `https://dribbble.com/${profileReplacement.user}`,
  matcher: {
    domain: /dribbble/,
  },
};
