"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export const StepWrapper = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="flex flex-col gap-8 w-full"
    >
      {children}
    </motion.div>
  );
};