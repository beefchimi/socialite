import {profileReplacement} from '../capture';
import type {SocialNetwork} from '../types';

export const youtube: SocialNetwork = {
  id: 'youtube',
  preferredUrl: `https://youtube.com/channel/${profileReplacement.user}`,
  appUrl: `https://m.youtube.com/c/${profileReplacement.user}`,
  matcher: {
    // `youtu.be` URLs do not currently support user channels.
    // We are capturing that anyways... in case this changes in the future.
    domain: /youtu/,
    // YouTube has a legacy `/user/*` URL.
    // We do not support this at the moment... but might reconsider.
    user: /^(?:\/channel\/|\/c\/)?(?:\/)?([^/]+)/,
  },
};

// Should capture domain:
// youtube.com
// youtu.be
// www.youtube.com
// m.youtu.be

// Should capture path:
// /channel/f00_Uz3r!
// /channel/f00_Uz3r!/trail-123
// /c/f00_Uz3r!
// /c/f00_Uz3r!/123-trail
// /f00_Uz3r!
