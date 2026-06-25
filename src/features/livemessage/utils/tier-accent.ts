import { PlanTier } from "@/features/ranking/types";

export interface TierAccent {
  label: string;
  color: string;
  soft: string;
  border: string;
}

export const TIER_ACCENT: Record<PlanTier, TierAccent> = {
  skorpionario: {
    label: "Skorpionário",
    color: "#A88600",
    soft: "rgba(242,206,22,0.12)",
    border: "rgba(242,206,22,0.45)",
  },
  skorpiao: {
    label: "Skorpião",
    color: "#E6193B",
    soft: "rgba(230,25,59,0.08)",
    border: "rgba(230,25,59,0.28)",
  },
  skorpionzinho: {
    label: "Skorpionzinho",
    color: "#1A1A1A",
    soft: "rgba(26,26,26,0.05)",
    border: "rgba(26,26,26,0.15)",
  },
};

export interface OverlayTier {
  label: string;
  color: string;
  glow: string;
}

export const OVERLAY_TIER: Record<PlanTier, OverlayTier> = {
  skorpionario: {
    label: "Skorpionário",
    color: "#F2CE16",
    glow: "rgba(242,206,22,0.45)",
  },
  skorpiao: {
    label: "Skorpião",
    color: "#F21B42",
    glow: "rgba(242,27,66,0.45)",
  },
  skorpionzinho: {
    label: "Skorpionzinho",
    color: "#FFFFFF",
    glow: "rgba(255,255,255,0.32)",
  },
};

export interface TierLabel {
  label: string;
  className: string;
  shine: boolean;
}

export const TIER_LABEL: Record<PlanTier, TierLabel> = {
  skorpionario: {
    label: "Skorpionário",
    className:
      "bg-gradient-to-br from-skorpion-yellow to-skorpion-darkYellow text-skorpion-black",
    shine: true,
  },
  skorpiao: {
    label: "Skorpião",
    className: "bg-skorpion-red/10 text-skorpion-red",
    shine: false,
  },
  skorpionzinho: {
    label: "Skorpionzinho",
    className: "bg-skorpion-black/[0.06] text-skorpion-black/70",
    shine: false,
  },
};
