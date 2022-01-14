import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const discord: SocialNetwork = {
  id: 'discord',
  preferredUrl: `https://discordapp.com/users/${profileReplacement.user}`,
  matcher: {
    domain: /discord/,
    user: /^(?:\/users\/)?(?:\/)?([^/]+)/,
  },
};

// Should pass:
// /users/f00_Uz3r!
// /users/f00_Uz3r!/trail-123
// /f00_Uz3r!/123-trail
// f00_Uz3r!
