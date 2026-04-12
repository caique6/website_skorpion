export interface HeroAction {
  id: string;
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

export interface HeroData {
  title: string;
  subtitle: string;
  heroImage: string;
  actions: HeroAction[];
}