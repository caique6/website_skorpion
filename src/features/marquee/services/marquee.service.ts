import { supabaseServer } from "@/lib/supabase";
import { MarqueeData, MarqueeMember } from "../types";

export const getMarqueeData = async (): Promise<MarqueeData> => {
  const { data, error } = await supabaseServer
    .from("members")
    .select("id, name, avatar_url, tier")
    .eq("is_active", true);

  if (error || !data) return { skorpionarios: [], skorpiaos: [], skorpionzinhos: [] };

  const toMember = (m: { id: string; name: string; avatar_url: string | null }): MarqueeMember => ({
    id: m.id,
    name: m.name,
    avatar: m.avatar_url ?? "🦂",
  });

  return {
    skorpionarios: data.filter((m) => m.tier === "skorpionario").map(toMember),
    skorpiaos: data.filter((m) => m.tier === "skorpiao").map(toMember),
    skorpionzinhos: data.filter((m) => m.tier === "skorpionzinho").map(toMember),
  };
};