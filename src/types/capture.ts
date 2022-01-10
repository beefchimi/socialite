import type {UrlAnatomy} from './general';

// NOTE: A non-string enum cannot be used
// as a valid RegExp named capture group.

export enum UrlCaptureId {
  // NOTE: This `enum` must be kept in sync with `UrlAnatomy`.
  Scheme = 'scheme',
  Subdomain = 'subdomain',
  Domain = 'domain',
  Tldomain = 'tldomain',
  Port = 'port',
  Path = 'path',
  Parameters = 'parameters',
  Anchor = 'anchor',
}

export enum SocialCaptureId {
  Network = 'network',
  Prefix = 'prefix',
  User = 'user',
}

export type ParsedUrlGroups = Partial<UrlAnatomy> | null;
