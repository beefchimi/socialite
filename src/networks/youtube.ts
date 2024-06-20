import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

// YouTube supports a multitude of different url formats...
// and unfortunately does not redirect to the correct URL
// when an incorrect match is provided.
// 1. `/channel/name`
// 2. `/c/name`
// 3. `/user/name`
// 4. `/name`
// And then of course there are `watch` URLs as well.

const leadingPath = '/channel|/c|/user';
const user = `^(?:${leadingPath})?/([^/]+)`;

export const youtube: SocialiteNetwork = {
  id: 'youtube',
  preferredUrl: `https://youtube.com${profileReplacement.leadingPath}/${profileReplacement.user}`,
  appUrl: `https://m.youtube.com${profileReplacement.leadingPath}/${profileReplacement.user}`,
  matcher: {
    // TODO: Worth considering if we match against short URLs.
    // https://github.com/beefchimi/socialite/issues/21
    domain: /youtu/,
    user,
    leadingPath,
  },
};
