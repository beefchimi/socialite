import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const facebook: SocialNetwork = {
  id: 'facebook',
  preferredUrl: `https://facebook.com/${profileReplacement.user}`,
  appUrl: `https://m.facebook.com/${profileReplacement.user}`,
  matcher: {
    domain: /facebook/,
  },
};
