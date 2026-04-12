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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
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
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-auto lg:mt-0">
        <span className="text-skorpion-white/60 font-bold text-xs lg:text-sm tracking-widest uppercase mb-3 lg:mb-4">
          {intro.subtitle}
        </span>
        <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black text-skorpion-white mb-4 lg:mb-6 uppercase tracking-tight leading-[1.05]">
          {intro.title}
        </h2>
        <p className="text-skorpion-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-xl leading-relaxed mb-8 lg:mb-10">
          {intro.description}
        </p>
        
        <motion.button
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
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 w-full flex flex-col gap-3 sm:gap-4 lg:gap-5 justify-center mb-auto lg:mb-0"
      >
        {intro.features.map((feature) => {
          const Icon = IconMap[feature.icon];
          return (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              className={cn(
                "group relative flex items-center gap-4 lg:gap-6 p-4 lg:p-5 rounded-[20px] lg:rounded-[28px] transition-all duration-300",
                "bg-gradient-to-br from-skorpion-white/10 to-skorpion-white/5",
                "border border-skorpion-white/10 hover:border-skorpion-white/20",
                "shadow-lg hover:shadow-2xl hover:bg-skorpion-white/10"
              )}
            >
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-[20px] bg-skorpion-black/40 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-tr from-skorpion-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="relative z-10 w-6 h-6 lg:w-7 lg:h-7 text-skorpion-white group-hover:text-skorpion-yellow transition-colors duration-300" strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-skorpion-white text-base lg:text-lg mb-0.5 lg:mb-1">{feature.title}</h3>
                <p className="text-skorpion-white/60 text-xs lg:text-sm font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
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