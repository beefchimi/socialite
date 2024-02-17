import type {UrlAnatomy} from './general';

export enum UrlCaptureId {
  Scheme = 'scheme',
  Domain = 'domain',
  Tldomain = 'tldomain',
  Port = 'port',
  Path = 'path',
  Parameters = 'parameters',
  Anchor = 'anchor',
}

export type UrlGroupSubset = Partial<UrlAnatomy>;
export type ParsedUrlGroups = UrlGroupSubset | null;
