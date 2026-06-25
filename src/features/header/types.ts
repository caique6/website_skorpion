export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export type HeaderCtaIcon = "whatsapp" | "live";

export interface HeaderCtaOption {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: HeaderCtaIcon;
}

export interface HeaderCta {
  label: string;
  options: HeaderCtaOption[];
}

export interface HeaderData {
  nav: NavItem[];
  cta: HeaderCta;
}
