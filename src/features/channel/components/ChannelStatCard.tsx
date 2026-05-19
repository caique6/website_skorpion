"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  value: string;
  index: number;
}

const formatNumber = (val: string) => {
  const num = Number(val);
  if (isNaN(num)) return val;
  return new Intl.NumberFormat("pt-BR").format(num);
};

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
      className="relative flex flex-col items-center justify-center text-center px-4 py-8 rounded-[20px] overflow-hidden cursor-default transition-colors duration-300 border border-white/10"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(230,25,59,0.15) 0%, transparent 70%)",
        }}
      />
      <span className="relative z-10 text-3xl lg:text-4xl font-black text-skorpion-white tracking-tight leading-none mb-2">
        {formatNumber(value)}
      </span>
      <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-skorpion-white/40">
        {label}
      </span>
    </motion.div>
  );
};
