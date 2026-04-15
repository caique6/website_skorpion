"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FooterData } from "../types";
import { SocialIcon } from "./SocialIcon";
import { FooterLinkItem } from "./FooterLinkItem";

interface Props {
  data: FooterData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
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
    <footer
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(230,25,59,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-black text-white uppercase tracking-tight">
                SKORPION
              </span>
              <p className="text-white/35 text-sm font-medium leading-relaxed max-w-[200px]">
                {data.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {data.socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.94 }}
                  className="group w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-skorpion-red hover:border-skorpion-red flex items-center justify-center transition-colors duration-300"
                >
                  <SocialIcon
                    type={social.icon}
                    className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/30">
              Navegação
            </span>
            <ul className="flex flex-col gap-3">
              {data.navLinks.map((link) => (
                <li key={link.id}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/30">
              Clube
            </span>
            <ul className="flex flex-col gap-3">
              {data.clubLinks.map((link) => (
                <li key={link.id}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/30">
              Canal
            </span>
            <ul className="flex flex-col gap-3">
              {data.channelLinks.map((link) => (
                <li key={link.id}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        <motion.div
          variants={itemVariants}
          className="w-full h-px mt-12 lg:mt-16"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
        >
          <span className="text-white/20 text-xs font-medium tracking-widest uppercase text-center sm:text-left">
            {data.copyright}
          </span>
          <span className="text-white/15 text-xs font-black uppercase tracking-widest">
            {data.clubName}
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
};