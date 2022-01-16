import {profileReplacement} from '../capture';
import {MatchUserSource} from '../types';
import type {SocialNetwork} from '../types';

export const substack: SocialNetwork = {
  id: 'substack',
  preferredUrl: `https://${profileReplacement.user}.substack.com`,
  matcher: {
    domain: /substack/,
    userSource: MatchUserSource.Subdomain,
  },
};
