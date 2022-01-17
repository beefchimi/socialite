import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const vimeo: SocialiteNetwork = {
  id: 'vimeo',
  preferredUrl: `https://vimeo.com/${profileReplacement.user}`,
  matcher: {
    domain: /vimeo/,
  },
};
