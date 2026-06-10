"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { EASE_OUT, TILE_FADE_UP } from "@/lib/animation";

type StatTone = "yellow" | "black" | "white";

interface Props {
  value: string;
  label: string;
  tone: StatTone;
  icon: LucideIcon;
  className?: string;
}

const toneClass: Record<StatTone, string> = {
  yellow: "bg-skorpion-yellow text-skorpion-black",
  black: "bg-skorpion-black text-skorpion-white",
  white: "bg-skorpion-white text-skorpion-black",
};

export const StatTile = ({ value, label, tone, icon: Icon, className }: Props) => {
  return (
    <motion.div
      variants={TILE_FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={`flex flex-col justify-between overflow-hidden rounded-3xl p-5 ${toneClass[tone]} ${className ?? ""}`}
    >
      <Icon className="h-5 w-5 opacity-70" strokeWidth={2.5} />
      <div>
        <p className="text-2xl font-black leading-none tracking-tight sm:text-3xl">
          {value}
        </p>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest opacity-70">
          {label}
        </p>
      </div>
    </motion.div>
  );
};
