"use client";

import { motion } from "framer-motion";
import { TILE_FADE_UP } from "@/lib/animation";

interface Props {
  label: string;
  className?: string;
}

export const ComingSoonTile = ({ label, className }: Props) => {
  return (
    <motion.div
      variants={TILE_FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex items-center justify-center rounded-3xl border-2 border-dashed border-skorpion-white/25 ${className ?? ""}`}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-skorpion-white/40">
        {label}
      </span>
    </motion.div>
  );
};
