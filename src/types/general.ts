export interface BasicObject {
  [key: string]: unknown;
}

export type BasicUrl = string;

export interface MergedRegExp {
  source: RegExp['source'];
  flags: RegExp['flags'];
}

// Consider revisions to this interface:
// ...insert issue url...
export interface UrlAnatomy {
  scheme: string;
  subdomain: string;
  domain: string;
  tldomain: string;
  port: string;
  path: string;
  parameters: string;
  anchor: string;
}
