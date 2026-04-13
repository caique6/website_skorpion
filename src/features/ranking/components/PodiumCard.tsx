"use client";

import { motion } from "framer-motion";
import { RankingMember } from "../types";
import { TIER_CONFIG, MEDAL_CONFIG, formatTime } from "../utils/ranking.utils";

interface Props {
  member: RankingMember;
  position: number;
  index: number;
}

const HEIGHT_MAP: Record<number, string> = {
  1: "h-40 lg:h-48",
  2: "h-28 lg:h-36",
  3: "h-20 lg:h-28",
};

const ORDER_MAP: Record<number, number> = {
  1: 2,
  2: 1,
  3: 3,
};

export const PodiumCard = ({ member, position, index }: Props) => {
  const tier = TIER_CONFIG[member.tier];
  const medal = MEDAL_CONFIG[position];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, delay: index * 0.1 }}
      className="flex flex-col items-center gap-3"
      style={{ order: ORDER_MAP[position] }}
    >
      <motion.div
        whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 24 } }}
        className="relative flex flex-col items-center gap-2"
      >
        {position === 1 && (
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-3xl"
          >
            👑
          </motion.div>
        )}

        <div
          className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-3xl lg:text-4xl border-2"
          style={{
            borderColor: medal.color,
            boxShadow: `0 0 24px ${medal.glow}, 0 0 48px ${medal.glow}`,
            background: "rgba(0,0,0,0.4)",
          }}
        >
          {member.avatar}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs border border-black/50"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {medal.emoji}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-black text-sm lg:text-base text-white uppercase tracking-tight text-center">
            {member.name}
          </span>
          <span
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
            style={{ color: tier.color, backgroundColor: tier.bg, borderColor: tier.border }}
          >
            {tier.label}
          </span>
          <span className="text-white/40 text-xs font-bold">
            {formatTime(member.months, member.days, member.hours)}
          </span>
        </div>
      </motion.div>

      <div
        className={`w-24 lg:w-32 ${HEIGHT_MAP[position]} rounded-t-[16px] flex items-start justify-center pt-3`}
        style={{
          background: `linear-gradient(to bottom, ${medal.color}22, ${medal.color}08)`,
          border: `1px solid ${medal.color}30`,
          borderBottom: "none",
        }}
      >
        <span className="font-black text-2xl lg:text-3xl" style={{ color: `${medal.color}60` }}>
          {position}
        </span>
      </div>
    </motion.div>
  );
};