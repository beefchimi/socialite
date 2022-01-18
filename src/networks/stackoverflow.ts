import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const stackoverflow: SocialiteNetwork = {
  id: 'stackoverflow',
  preferredUrl: `https://stackoverflow.com/users/${profileReplacement.user}`,
  matcher: {
    domain: /stackoverflow/,
    user: /^(?:\/users\/)(?:\d+?[/])?([^/]+)/,
  },
};
