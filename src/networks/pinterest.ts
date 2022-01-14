import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const pinterest: SocialNetwork = {
  id: 'pinterest',
  preferredUrl: `https://pinterest.com/${profileReplacement.user}`,
  matcher: {
    domain: /pinterest/,
  },
};
