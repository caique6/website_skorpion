"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  value: string;
  index: number;
}

export const ChannelStatCard = ({ label, value, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        delay: index * 0.07,
      }}
      className="relative flex flex-col items-center justify-center text-center px-4 py-6 rounded-[20px] border border-white/10 overflow-hidden cursor-default group"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(242,206,22,0.10) 0%, transparent 70%)",
        }}
      />
      <span className="relative z-10 text-3xl lg:text-4xl font-black text-skorpion-white tracking-tight leading-none mb-2">
        {value}
      </span>
      <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-skorpion-white/40">
        {label}
      </span>
    </motion.div>
  );
};