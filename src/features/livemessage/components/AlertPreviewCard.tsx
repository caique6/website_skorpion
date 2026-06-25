"use client";

import Image from "next/image";
import { PlanTier } from "@/features/ranking/types";
import { TIER_ACCENT } from "../utils/tier-accent";

interface Props {
  name: string;
  avatarUrl: string | null;
  tier: PlanTier;
  message: string;
  suffix: string;
}

export const AlertPreviewCard = ({ name, avatarUrl, tier, message, suffix }: Props) => {
  const accent = TIER_ACCENT[tier];

  return (
    <div
      className="flex items-start gap-4 rounded-[20px] border-2 p-5"
      style={{ borderColor: accent.border, backgroundColor: accent.soft }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-base font-black"
        style={{ borderColor: accent.color, color: accent.color }}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-black uppercase tracking-tight text-[#1A1A1A]">
            {name}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest"
            style={{ color: accent.color, backgroundColor: accent.soft, border: `1px solid ${accent.border}` }}
          >
            {accent.label}
          </span>
          <span className="text-xs font-medium text-[#1A1A1A]/40">{suffix}</span>
        </div>
        <p className="break-words text-sm font-medium leading-snug text-[#1A1A1A]/80">
          &ldquo;{message}&rdquo;
        </p>
      </div>
    </div>
  );
};
