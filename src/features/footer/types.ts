export type SocialIconType = "youtube" | "instagram" | "tiktok" | "discord";

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: SocialIconType;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  external: boolean;
}

export interface FooterColumnData {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface DiscordInfo {
  title: string;
  subtitle: string;
  label: string;
  url: string;
}

export interface FooterData {
  tagline: string;
  socials: SocialLink[];
  columns: FooterColumnData[];
  discord: DiscordInfo;
  copyright: string;
  clubName: string;
}
