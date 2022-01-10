export interface BasicObject {
  [key: string]: unknown;
}

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

export type BasicUrl = string;
