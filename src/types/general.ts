export interface MergedRegExp {
  source: RegExp['source'];
  flags: RegExp['flags'];
}

export interface UrlAnatomy {
  domain: string;
  tldomain: string;
  scheme?: string;
  subdomain?: string;
  port?: string;
  path?: string;
  parameters?: string;
  anchor?: string;
}
