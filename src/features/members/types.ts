export type PlanTier = "skorpionzinho" | "skorpiao" | "skorpionario";

export interface Benefit {
  id: string;
  title: string;
  icon: string;
}

export interface Plan {
  id: string;
  tier: PlanTier;
  name: string;
  currency: string;
  price: string;
  billingCycle: string;
  benefits: Benefit[];
  highlighted: boolean;
  youtubeUrl: string;
}

export interface PlansSectionContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  plans: Plan[];
}