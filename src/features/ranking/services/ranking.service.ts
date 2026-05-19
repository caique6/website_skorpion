import { supabaseServer, getAvatarPublicUrl } from "@/lib/supabase";
import { normalizeTier } from "@/lib/tier-utils";
import { RankingData, RankingMember } from "../types";

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

export const getRankingData = async (): Promise<RankingData> => {
  const { data, error } = await supabaseServer
    .from("members")
    .select("id, name, avatar_url, tier, membership_started_at")
    .eq("is_active", true);

  if (error || !data) return { members: [] };

  const members: RankingMember[] = data
    .map((m) => {
      const tier = normalizeTier(m.tier);
      if (!tier) return null;

      return {
        id: m.id,
        name: m.name,
        avatar: getAvatarPublicUrl(m.avatar_url),
        tier,
        ...computeMembership(m.membership_started_at),
      };
    })
    .filter((m): m is RankingMember => m !== null);

  return { members };
};
