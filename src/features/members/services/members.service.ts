import { supabaseServer } from "@/lib/supabase";
import { MembersData, SkorpionarioMember } from "../types";
import { PLANS } from "../data/mock";

export const getMembersData = async (): Promise<MembersData> => {
  const { data, error } = await supabaseServer
    .from("members")
    .select("id, name, avatar_url")
    .eq("is_active", true)
    .eq("tier", "skorpionario");

  const skorpionarios: SkorpionarioMember[] = error || !data
    ? []
    : data.map((m) => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar_url ?? "🦂",
      }));

  return { plans: PLANS, skorpionarios };
};