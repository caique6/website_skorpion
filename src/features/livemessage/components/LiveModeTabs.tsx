"use client";

import { motion } from "framer-motion";
import { HandCoins, Radio } from "lucide-react";
import { LiveMode } from "../types";

interface Props {
  mode: LiveMode;
  onChange: (mode: LiveMode) => void;
}

const TABS: { key: LiveMode; label: string; icon: typeof Radio }[] = [
  { key: "donation", label: "Doar via PIX", icon: HandCoins },
  { key: "message", label: "Recado de membro", icon: Radio },
];

export const LiveModeTabs = ({ mode, onChange }: Props) => (
  <div className="flex w-full items-center gap-1 rounded-full border border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.02] p-1">
    {TABS.map((tab) => {
      const active = mode === tab.key;
      return (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className="relative flex flex-1 items-center justify-center rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-wide sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-widest"
        >
          {active && (
            <motion.span
              layoutId="live-mode-pill"
              className="absolute inset-0 rounded-full bg-[#1A1A1A]"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 flex items-center gap-2 whitespace-nowrap ${active ? "text-white" : "text-[#1A1A1A]/45"}`}
          >
            <tab.icon className="hidden h-3.5 w-3.5 sm:block" />
            {tab.label}
          </span>
        </button>
      );
    })}
  </div>
);
