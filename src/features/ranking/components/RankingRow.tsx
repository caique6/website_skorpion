"use client";

import { motion } from "framer-motion";
import { RankingMember } from "../types";
import { TIER_CONFIG, formatTime } from "../utils/ranking.utils";

interface Props {
  member: RankingMember;
  position: number;
  index: number;
}

export const RankingRow = ({ member, position, index }: Props) => {
  const tier = TIER_CONFIG[member.tier];
  const isSkorpinario = member.tier === "skorpionario";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: index * 0.04 }}
      whileHover={{ x: 4, transition: { type: "spring", stiffness: 360, damping: 28 } }}
      className="group flex items-center gap-4 px-4 lg:px-6 py-3.5 rounded-[16px] border transition-colors duration-200"
      style={{
        background: isSkorpinario ? "rgba(242,206,22,0.04)" : "rgba(255,255,255,0.03)",
        borderColor: isSkorpinario ? "rgba(242,206,22,0.15)" : "rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="font-black text-sm w-6 text-center shrink-0"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        {position}
      </span>

      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 border"
        style={{
          background: "rgba(0,0,0,0.3)",
          borderColor: tier.border,
        }}
      >
        {member.avatar}
      </div>

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <span className="font-black text-sm text-white uppercase tracking-tight truncate">
          {member.name}
        </span>
        <span
          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 hidden sm:block"
          style={{ color: tier.color, backgroundColor: tier.bg, borderColor: tier.border }}
        >
          {tier.label}
        </span>
      </div>

      <span className="font-black text-xs shrink-0" style={{ color: tier.color }}>
        {formatTime(member.months, member.days, member.hours)}
      </span>
    </motion.div>
  );
};