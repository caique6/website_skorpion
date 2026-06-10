export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderCta {
  label: string;
  href: string;
}

export interface HeaderData {
  nav: NavItem[];
  cta: HeaderCta;
}
