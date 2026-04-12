export type IntroIconType = "gamepad" | "video" | "message";

export interface IntroFeature {
  id: string;
  icon: IntroIconType;
  title: string;
  description: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export interface Plan {
  id: string;
  tier: number;
  name: string;
  price: string;
  billingCycle: string;
  benefits: Benefit[];
  highlighted: boolean;
}

export interface MembersIntro {
  title: string;
  subtitle: string;
  description: string;
  features: IntroFeature[];
  buttonLabel: string;
}

export interface MembersData {
  intro: MembersIntro;
  plans: Plan[];
}