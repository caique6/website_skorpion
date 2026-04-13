import { PlanTier, RankingMember } from "../types";

export const TIER_CONFIG: Record<PlanTier, { label: string; color: string; bg: string; border: string; order: number }> = {
  skorpionario: {
    label: "Skorpionário",
    color: "#F2CE16",
    bg: "rgba(242,206,22,0.08)",
    border: "rgba(242,206,22,0.25)",
    order: 3,
  },
  skorpiao: {
    label: "Skorpião",
    color: "#E6193B",
    bg: "rgba(230,25,59,0.08)",
    border: "rgba(230,25,59,0.25)",
    order: 2,
  },
  skorpionzinho: {
    label: "Skorpionzinho",
    color: "rgba(255,255,255,0.6)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.12)",
    order: 1,
  },
};

export const MEDAL_CONFIG: Record<number, { emoji: string; color: string; glow: string }> = {
  1: { emoji: "🥇", color: "#F2CE16", glow: "rgba(242,206,22,0.4)" },
  2: { emoji: "🥈", color: "#C0C0C0", glow: "rgba(192,192,192,0.3)" },
  3: { emoji: "🥉", color: "#CD7F32", glow: "rgba(205,127,50,0.3)" },
};

export const formatTime = (months: number, days: number, hours: number): string => {
  const parts: string[] = [];
  if (months > 0) parts.push(`${months}m`);
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${hours}h`);
  return parts.join(" ");
};

export const toTotalHours = (member: RankingMember): number =>
  member.months * 30 * 24 + member.days * 24 + member.hours;

export const sortByTime = (members: RankingMember[]): RankingMember[] =>
  [...members].sort((a, b) => toTotalHours(b) - toTotalHours(a));