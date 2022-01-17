import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const devto: SocialiteNetwork = {
  id: 'dev_to',
  preferredUrl: `https://dev.to/${profileReplacement.user}`,
  matcher: {
    domain: /^dev$/,
  },
};
