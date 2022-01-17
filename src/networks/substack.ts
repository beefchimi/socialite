import {profileReplacement} from '../capture';
import {MatchUserSource} from '../types';
import type {SocialiteNetwork} from '../types';

export const substack: SocialiteNetwork = {
  id: 'substack',
  preferredUrl: `https://${profileReplacement.user}.substack.com`,
  matcher: {
    domain: /substack/,
    userSource: MatchUserSource.Subdomain,
  },
};
