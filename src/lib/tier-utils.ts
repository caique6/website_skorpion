export type PlanTier = "skorpionzinho" | "skorpiao" | "skorpionario";

/**
 * Mapa de normalização de tiers — aceita todas as variações de capitalização
 * e acentuação que podem existir no banco de dados.
 */
const TIER_NORMALIZE: Record<string, PlanTier> = {
  // Skorpionário
  skorpionario: "skorpionario",
  skorpionário: "skorpionario",
  Skorpionario: "skorpionario",
  Skorpionário: "skorpionario",
  SKORPIONARIO: "skorpionario",
  SKORPIONÁRIO: "skorpionario",
  // Skorpião
  skorpiao: "skorpiao",
  skorpião: "skorpiao",
  Skorpiao: "skorpiao",
  Skorpião: "skorpiao",
  SKORPIAO: "skorpiao",
  SKORPIÃO: "skorpiao",
  // Skorpionzinho
  skorpionzinho: "skorpionzinho",
  Skorpionzinho: "skorpionzinho",
  SKORPIONZINHO: "skorpionzinho",
};

/**
 * Normaliza um valor de tier do banco para o tipo canônico PlanTier.
 * Retorna null se o valor não for reconhecido.
 */
export function normalizeTier(raw: string | null | undefined): PlanTier | null {
  if (!raw) return null;
  return TIER_NORMALIZE[raw.trim()] ?? null;
}
