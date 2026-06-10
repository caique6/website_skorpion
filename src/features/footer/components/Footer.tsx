"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WaveDivider } from "@/features/marquee/components/WaveDivider";
import { FooterData } from "../types";
import { SocialIcon } from "./SocialIcon";
import { FooterColumn } from "./FooterColumn";
import { DiscordCallout } from "./DiscordCallout";

interface Props {
  data: FooterData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 28 },
  },
};

export const Footer = ({ data }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className="relative w-full overflow-hidden bg-skorpion-black">
      <WaveDivider tone="red" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-32 sm:pt-44 md:px-12"
      >
        <motion.div variants={itemVariants}>
          <DiscordCallout discord={data.discord} />
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <motion.div
            variants={itemVariants}
            className="col-span-2 flex flex-col gap-5 md:col-span-1"
          >
            <span className="text-2xl font-black uppercase tracking-tight text-skorpion-white">
              SKORPION
            </span>
            <p className="max-w-[200px] text-sm font-medium leading-relaxed text-skorpion-white/35">
              {data.tagline}
            </p>
            <div className="flex items-center gap-3">
              {data.socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-skorpion-white/10 bg-skorpion-white/5 transition-colors duration-300 hover:border-skorpion-red hover:bg-skorpion-red"
                >
                  <SocialIcon
                    type={social.icon}
                    className="h-4 w-4 text-skorpion-white/50 transition-colors duration-300 group-hover:text-skorpion-white"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {data.columns.map((column) => (
            <motion.div key={column.id} variants={itemVariants}>
              <FooterColumn column={column} />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-skorpion-white/10 to-transparent"
        />

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <span className="text-center text-xs font-medium uppercase tracking-widest text-skorpion-white/20 sm:text-left">
            {data.copyright}
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-skorpion-white/15">
            {data.clubName}
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
};
