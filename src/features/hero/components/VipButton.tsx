"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HeroAction } from "../types";

interface Props {
  action: HeroAction;
  onHoverChange: (hovered: boolean) => void;
}

const SP_LAYOUT = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
} as const;

export const VipButton = ({ action, onHoverChange }: Props) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = (isHovered: boolean) => {
    if (typeof window !== "undefined" && window.innerWidth >= 640) {
      setHovered(isHovered);
      onHoverChange(isHovered);
    }
  };

  return (
    <motion.div
      layout
      className="relative p-[2px] rounded-full w-full sm:flex-1 h-[52px] sm:h-[56px]"
      onHoverStart={() => handleHover(true)}
      onHoverEnd={() => handleHover(false)}
      transition={SP_LAYOUT}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #F2CE16 0%, #F27127 35%, #F21B42 65%, #F2CE16 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(242,206,22,0.20), 0 0 20px 4px rgba(242,27,66,0.12)",
            "0 0 22px 6px rgba(242,206,22,0.55), 0 0 40px 10px rgba(242,27,66,0.25)",
            "0 0 10px 2px rgba(242,206,22,0.20), 0 0 20px 4px rgba(242,27,66,0.12)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.a
        layout
        href={action.url}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#1c0600] to-[#0d0010] text-[#F2CE16] font-black text-[12px] sm:text-[13px] tracking-[0.04em] sm:tracking-[0.08em] uppercase whitespace-nowrap px-4"
        transition={SP_LAYOUT}
      >
        <div className="flex sm:hidden items-center gap-2">
          <span className="text-sm">🔥</span>
          <span>{action.hoverLabel || action.label}</span>
          <ChevronRight className="w-4 h-4 shrink-0" strokeWidth={3} />
        </div>

        <div className="hidden sm:flex relative items-center justify-center w-full h-full">
          <motion.div
            className="absolute flex items-center gap-2"
            animate={{ y: hovered ? -40 : 0, opacity: hovered ? 0 : 1 }}
            transition={SP_LAYOUT}
          >
            <span className="text-base">🔥</span>
            <span>{action.label}</span>
            <ChevronRight className="w-4 h-4 shrink-0" strokeWidth={3} />
          </motion.div>

          <motion.div
            className="absolute flex items-center gap-2"
            animate={{ y: hovered ? 0 : 40, opacity: hovered ? 1 : 0 }}
            transition={SP_LAYOUT}
          >
            <span className="text-base">🔥</span>
            <span>{action.hoverLabel}</span>
            <ChevronRight className="w-4 h-4 shrink-0" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
};
