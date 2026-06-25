"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

export const ErrorBox = ({ message }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3.5"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-skorpion-red" />
      <p className="text-xs font-medium leading-relaxed text-skorpion-red">{message}</p>
    </motion.div>
  );
};
