"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FooterData } from "../types";
import { SocialIcon } from "./SocialIcon";

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
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #E6193B 0%, #1A1A1A 60%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(230,25,59,0.25) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 lg:py-28 flex flex-col items-center gap-12">

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-px origin-center"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-10 w-full"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
            <span className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tight">
              SKORPION
            </span>
            <span className="text-white/40 text-sm font-medium tracking-widest uppercase">
              {data.tagline}
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 lg:gap-5 flex-wrap justify-center"
          >
            {data.socials.map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.12,
                  y: -3,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                whileTap={{ scale: 0.94 }}
                className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <SocialIcon
                  type={social.icon}
                  className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300"
                />
                <span className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors duration-300">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          <motion.span
            variants={itemVariants}
            className="text-white/25 text-xs font-medium tracking-widest uppercase text-center"
          >
            {data.copyright}
          </motion.span>
        </motion.div>
      </div>
    </footer>
  );
};