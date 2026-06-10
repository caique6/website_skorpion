"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Youtube } from "lucide-react";
import { EASE_OUT, TILE_FADE_UP } from "@/lib/animation";

interface Props {
  value: string;
  label: string;
  url: string;
  className?: string;
}

export const ChannelTile = ({ value, label, url, className }: Props) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      variants={TILE_FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-skorpion-black p-5 text-skorpion-white ${className ?? ""}`}
    >
      <span aria-hidden className="card-shine" />

      <div className="relative z-10 flex items-center justify-between">
        <Youtube className="h-5 w-5" strokeWidth={2.5} />
        <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <div className="relative z-10">
        <p className="text-2xl font-black leading-none tracking-tight sm:text-3xl">
          {value}
        </p>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest opacity-70">
          {label}
        </p>
      </div>
    </motion.a>
  );
};
