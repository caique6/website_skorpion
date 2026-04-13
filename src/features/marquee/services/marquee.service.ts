import { supabaseClient } from "@/lib/supabase";
import { MarqueeData, MarqueeMember } from "../types";

export const getMarqueeData = async (): Promise<MarqueeData> => {
  const { data, error } = await supabaseClient
    .from("members_public")
    .select("id, name, avatar_url, tier");

  if (error || !data) return { skorpionarios: [], skorpiaos: [] };

  const toMember = (m: { id: string; name: string; avatar_url: string | null }): MarqueeMember => ({
    id: m.id,
    name: m.name,
    avatar: m.avatar_url ?? "🦂",
  });

  const skorpionarios = data
    .filter((m) => m.tier === "skorpionario")
    .map(toMember);

  const skorpiaos = data
    .filter((m) => m.tier === "skorpiao")
    .map(toMember);

  return { skorpionarios, skorpiaos };
};