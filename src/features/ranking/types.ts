export type PlanTier = "skorpionzinho" | "skorpiao" | "skorpionario";

export interface RankingMember {
  id: string;
  name: string;
  avatar: string;
  tier: PlanTier;
  months: number;
  days: number;
  hours: number;
}

export interface RankingData {
  members: RankingMember[];
}