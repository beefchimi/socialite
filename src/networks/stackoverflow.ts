import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const stackoverflow: SocialNetwork = {
  id: 'stackoverflow',
  preferredUrl: `https://stackoverflow.com/users/${profileReplacement.user}`,
  matcher: {
    domain: /stackoverflow/,
    user: /^(?:\/users\/)?(?:[/]?\d+)?(?:\/)?([^/]+)/,
  },
};
