export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: SocialIconType;
}

export type SocialIconType = "youtube" | "instagram" | "tiktok";

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  external: boolean;
}

export interface FooterData {
  socials: SocialLink[];
  navLinks: FooterLink[];
  clubLinks: FooterLink[];
  channelLinks: FooterLink[];
  tagline: string;
  copyright: string;
  clubName: string;
}