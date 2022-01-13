export interface BasicObject {
  [key: string]: unknown;
}

export type BasicUrl = string;

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
