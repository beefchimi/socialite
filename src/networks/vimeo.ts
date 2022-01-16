import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const vimeo: SocialNetwork = {
  id: 'vimeo',
  preferredUrl: `https://vimeo.com/${profileReplacement.user}`,
  matcher: {
    domain: /vimeo/,
  },
};
