export interface YoutubeChannel {
  id: string;
  label: string;
  url: string;
  color: string;
}

export interface HeroAction {
  id: string;
  label: string;
  hoverLabel?: string;
  url: string;
  variant: "primary" | "secondary";
  channels?: YoutubeChannel[];
}

export interface HeroData {
  title: string;
  subtitle: string;
  heroImage: string;
  actions: HeroAction[];
}
