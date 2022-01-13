import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const facebook: SocialNetwork = {
  id: 'facebook',
  title: 'Facebook',
  preferredUrl: `https://facebook.com/${profileReplacement.user}`,
  matcher: {
    domain: 'facebook',
  },
};
