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
  price: string;
  billingCycle: string;
  benefits: Benefit[];
  highlighted: boolean;
  youtubeUrl: string;
}

export interface SkorpionarioMember {
  id: string;
  name: string;
  avatar: string;
}

export interface MembersData {
  plans: Plan[];
  skorpionarios: SkorpionarioMember[];
}