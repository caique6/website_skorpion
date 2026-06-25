"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { LiveStage } from "./LiveStage";
import { PillButton } from "./PillButton";
import { LiveMessageContent } from "../types";

interface Props {
  content: LiveMessageContent;
  onReset: () => void;
}

export const LiveMessageSuccess = ({ content, onReset }: Props) => {
  const copy = content.success;

  return (
    <LiveStage>
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10"
        >
          <CheckCircle className="h-7 w-7 text-green-500" strokeWidth={2} />
        </motion.div>

        <h2 className="text-4xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A] lg:text-5xl">
          {copy.headlineLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="max-w-lg text-sm font-medium leading-relaxed text-[#1A1A1A]/55 lg:text-base">
          {copy.subtitle}
        </p>
      </div>

      <PillButton onClick={onReset}>{copy.resetLabel}</PillButton>
    </LiveStage>
  );
};
