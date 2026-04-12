export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: SocialIconType;
}

export type SocialIconType = "youtube" | "instagram" | "tiktok" | "twitch" | "discord";

export interface FooterData {
  socials: SocialLink[];
  tagline: string;
  copyright: string;
}