import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const devto: SocialNetwork = {
  id: 'dev_to',
  preferredUrl: `https://dev.to/${profileReplacement.user}`,
  matcher: {
    domain: /^dev$/,
  },
};
