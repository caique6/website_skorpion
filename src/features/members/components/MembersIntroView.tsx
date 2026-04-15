"use client";

import { motion } from "framer-motion";
import { Gamepad2, Video, MessageSquare, ChevronRight } from "lucide-react";
import { MembersIntro, IntroIconType } from "../types";

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
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28 },
  },
};

export const MembersIntroView = ({ intro, onAction }: Props) => {
  return (
    <motion.div
      key="intro-view"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start gap-6"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="text-white/30 font-black text-[10px] tracking-[0.35em] uppercase">
            {intro.subtitle}
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white uppercase tracking-tight leading-[1.02]">
            {intro.title}
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-white/50 text-sm lg:text-base font-medium leading-relaxed max-w-sm"
        >
          {intro.description}
        </motion.p>

        <motion.button
          variants={itemVariants}
          onClick={onAction}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm tracking-wider uppercase overflow-hidden text-white transition-shadow duration-300"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.20)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.20)",
          }}
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10">{intro.buttonLabel}</span>
          <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        {intro.features.map((feature) => {
          const Icon = IconMap[feature.icon];
          return (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 28 } }}
              className="group flex items-center gap-4 p-4 rounded-2xl cursor-default"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Icon className="w-4 h-4 text-white" strokeWidth={2} />
              </div>

              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="font-black text-sm text-white leading-tight">
                  {feature.title}
                </span>
                <span className="text-xs font-medium text-white/50 leading-relaxed">
                  {feature.description}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};