import {profileReplacement} from '../capture';
import type {SocialiteNetwork} from '../types';

export const youtube: SocialiteNetwork = {
  id: 'youtube',
  preferredUrl: `https://youtube.com/channel/${profileReplacement.user}`,
  appUrl: `https://m.youtube.com/c/${profileReplacement.user}`,
  matcher: {
    // TODO: Worth considering if we match against short URLs.
    // https://github.com/beefchimi/socialite/issues/21
    domain: /youtube/,
    // Not currently supporting the legacy `/user/*` URL.
    user: /^\/(?:channel|c)\/([^/]+)/,
  },
};
