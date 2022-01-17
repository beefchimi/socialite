import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const facebook: SocialiteNetwork = {
  id: 'facebook',
  preferredUrl: `https://facebook.com/${profileReplacement.user}`,
  appUrl: `https://m.facebook.com/${profileReplacement.user}`,
  matcher: {
    domain: /facebook/,
  },
};
