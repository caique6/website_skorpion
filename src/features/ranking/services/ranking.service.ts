import { supabaseServer } from "@/lib/supabase";
import { normalizeTier } from "@/lib/tier-utils";
import { RankingData, RankingMember, PlanTier } from "../types";
import { MODAL_COUNT } from "../constants";
import { toTotalHours } from "../utils/ranking.utils";

function computeMembership(membershipStartedAt: string): Pick<RankingMember, "months" | "days" | "hours"> {
  const started = new Date(membershipStartedAt);
  const now = new Date();

  const totalHours = Math.floor((now.getTime() - started.getTime()) / 1000 / 60 / 60);
  const months = Math.floor(totalHours / (30 * 24));
  const remainingAfterMonths = totalHours - months * 30 * 24;
  const days = Math.floor(remainingAfterMonths / 24);
  const hours = remainingAfterMonths - days * 24;

  return { months, days, hours };
}

function takeLongestPerTier(members: RankingMember[]): RankingMember[] {
  const byTier = new Map<PlanTier, RankingMember[]>();

  for (const member of [...members].sort((a, b) => toTotalHours(b) - toTotalHours(a))) {
    const tierMembers = byTier.get(member.tier) ?? [];
    if (tierMembers.length < MODAL_COUNT) {
      tierMembers.push(member);
      byTier.set(member.tier, tierMembers);
    }
  }

  return Array.from(byTier.values()).flat();
}

export const getRankingData = async (): Promise<RankingData> => {
  const { data, error } = await supabaseServer
    .from("members")
    .select("id, avatar_url, tier, membership_started_at")
    .eq("is_active", true)
    .not("avatar_url", "is", null);

  if (error || !data) return { members: [] };

  const members: RankingMember[] = data
    .map((m) => {
      const tier = normalizeTier(m.tier);
      if (!tier) return null;

      return {
        id: m.id,
        avatar: `/api/avatar/${m.id}`,
        tier,
        ...computeMembership(m.membership_started_at),
      };
    })
    .filter((m): m is RankingMember => m !== null);

  return { members: takeLongestPerTier(members) };
};
