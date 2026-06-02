import { supabaseServer } from "@/lib/supabase";
import { normalizeTier } from "@/lib/tier-utils";
import { MembersData, SkorpionarioMember } from "../types";
import { PLANS } from "../data/mock";

export const getMembersData = async (): Promise<MembersData> => {
  const { data, error } = await supabaseServer
    .from("members")
    .select("id, name, avatar_url, tier")
    .eq("is_active", true);

  const skorpionarios: SkorpionarioMember[] = error || !data
    ? []
    : data
        .filter((m) => normalizeTier(m.tier) === "skorpionario")
        .map((m) => ({
          id: m.id,
          name: m.name,
          avatar: m.avatar_url ? `/api/avatar/${m.id}` : '🦂',
        }));

  return { plans: PLANS, skorpionarios };
};