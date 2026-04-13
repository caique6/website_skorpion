"use client";

import { motion } from "framer-motion";
import { Gamepad2, Video, MessageSquare, ChevronRight } from "lucide-react";
import { MembersIntro, IntroIconType } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  intro: MembersIntro;
  onAction: () => void;
}

const IconMap: Record<IntroIconType, React.ElementType> = {
  gamepad: Gamepad2,
  video: Video,
  message: MessageSquare,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
};

export const MembersIntroView = ({ intro, onAction }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-20 overflow-y-auto lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 lg:pb-0"
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-auto lg:mt-0"
      >
        <motion.span
          variants={textVariants}
          className="text-skorpion-white/50 font-bold text-xs lg:text-sm tracking-widest uppercase mb-3 lg:mb-4"
        >
          {intro.subtitle}
        </motion.span>

        <motion.h2
          variants={textVariants}
          className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black text-skorpion-white mb-4 lg:mb-6 uppercase tracking-tight leading-[1.05]"
        >
          {intro.title}
        </motion.h2>

        <motion.p
          variants={textVariants}
          className="text-skorpion-white/75 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-xl leading-relaxed mb-8 lg:mb-10"
        >
          {intro.description}
        </motion.p>

        <motion.button
          variants={textVariants}
          onClick={onAction}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "group relative w-full sm:w-auto flex items-center justify-center lg:justify-start gap-3 px-8 lg:px-10 py-4 lg:py-5 rounded-full font-bold text-sm lg:text-base tracking-wide transition-all duration-300 uppercase overflow-hidden",
            "bg-gradient-to-r from-skorpion-red to-[#ff3b3b] text-skorpion-white",
            "shadow-[0_8px_20px_rgba(242,27,66,0.4)] hover:shadow-[0_12px_30px_rgba(242,27,66,0.6)]"
          )}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          <span className="relative z-10">{intro.buttonLabel}</span>
          <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 w-full flex flex-col gap-3 lg:gap-4 justify-center mb-auto lg:mb-0"
      >
        {intro.features.map((feature) => {
          const Icon = IconMap[feature.icon];
          return (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                x: 6,
                transition: { type: "spring", stiffness: 360, damping: 26 },
              }}
              className="group relative flex items-center gap-4 lg:gap-5 p-4 lg:p-5 rounded-[20px] lg:rounded-[24px] overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                }}
              />

              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
                className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-[14px] lg:rounded-[16px] flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(242,27,66,0.3) 0%, transparent 60%)",
                  }}
                />
                <Icon
                  className="relative z-10 w-5 h-5 lg:w-6 lg:h-6 text-skorpion-white/70 group-hover:text-skorpion-white transition-colors duration-300"
                  strokeWidth={1.8}
                />
              </motion.div>

              <div className="text-left flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-skorpion-white text-sm lg:text-base leading-tight">
                    {feature.title}
                  </h3>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                    className="h-px flex-1 origin-left"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                </div>
                <p className="text-skorpion-white/55 text-xs lg:text-sm font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};