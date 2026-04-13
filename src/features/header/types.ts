export interface DropdownItem {
  id: string;
  label: string;
  description: string;
  url: string;
}

export interface NavItem {
  id: string;
  label: string;
  anchor?: string;
  dropdown?: DropdownItem[];
}

export interface HeaderData {
  nav: NavItem[];
}