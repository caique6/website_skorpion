"use client";

import { motion } from "framer-motion";
import { ReclaimStep } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  current: ReclaimStep;
  total: number;
}

export const StepIndicator = ({ current, total }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const step = (i + 1) as ReclaimStep;
        const isCompleted = current > step;
        const isActive = current === step;

        return (
          <div key={step} className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{
                  width: isActive ? 32 : 8,
                  backgroundColor: isCompleted
                    ? "#E6193B"
                    : isActive
                    ? "#1A1A1A"
                    : "#D1D5DB",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="h-2 rounded-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};