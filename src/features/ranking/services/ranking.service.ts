import { supabaseClient } from "@/lib/supabase";
import { RankingData, RankingMember } from "../types";

function computeMembership(createdAt: string): Pick<RankingMember, "months" | "days" | "hours"> {
  const created = new Date(createdAt);
  const now = new Date();

  const totalHours = Math.floor((now.getTime() - created.getTime()) / 1000 / 60 / 60);
  const months = Math.floor(totalHours / (30 * 24));
  const remainingAfterMonths = totalHours - months * 30 * 24;
  const days = Math.floor(remainingAfterMonths / 24);
  const hours = remainingAfterMonths - days * 24;

  return { months, days, hours };
}

export const getRankingData = async (): Promise<RankingData> => {
  const { data, error } = await supabaseClient
    .from("members_public")
    .select("id, name, avatar_url, tier, created_at");

  if (error || !data) return { members: [] };

  const members: RankingMember[] = data.map((m) => ({
    id: m.id,
    name: m.name,
    avatar: m.avatar_url ?? "🦂",
    tier: m.tier,
    ...computeMembership(m.created_at),
  }));

  return { members };
};