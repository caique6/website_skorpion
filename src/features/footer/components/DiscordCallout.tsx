"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animation";
import { DiscordInfo } from "../types";
import { SocialIcon } from "./SocialIcon";

interface Props {
  discord: DiscordInfo;
}

export const DiscordCallout = ({ discord }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-skorpion-red to-skorpion-darkRed p-8 shadow-[0_24px_60px_rgba(242,27,66,0.30)] sm:p-10">
      <span aria-hidden className="card-shine" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-skorpion-white/15 text-skorpion-white">
            <SocialIcon type="discord" className="h-7 w-7" />
          </span>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-skorpion-white sm:text-2xl">
              {discord.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-skorpion-white/75">
              {discord.subtitle}
            </p>
          </div>
        </div>

        <motion.a
          href={discord.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="flex shrink-0 items-center gap-2 rounded-full bg-skorpion-white px-7 py-3.5 text-sm font-black uppercase tracking-widest text-skorpion-red shadow-lg"
        >
          <SocialIcon type="discord" className="h-4 w-4" />
          {discord.label}
        </motion.a>
      </div>
    </div>
  );
};
