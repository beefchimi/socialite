import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const pinterest: SocialiteNetwork = {
  id: 'pinterest',
  preferredUrl: `https://pinterest.com/${profileReplacement.user}`,
  matcher: {
    domain: /pinterest/,
  },
};
