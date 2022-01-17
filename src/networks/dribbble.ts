import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const dribbble: SocialiteNetwork = {
  id: 'dribbble',
  preferredUrl: `https://dribbble.com/${profileReplacement.user}`,
  matcher: {
    domain: /dribbble/,
  },
};
