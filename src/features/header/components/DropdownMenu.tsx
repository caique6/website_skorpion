"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DropdownItem } from "../types";

interface Props {
  items: DropdownItem[];
}

const containerVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 28, staggerChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.97,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
};

export const DropdownMenu = ({ items }: Props) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-72 rounded-[20px] overflow-hidden z-50"
      style={{
        background: "rgba(15,15,15,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05)",
      }}
    >
      <div className="p-2">
        {items.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Link
              href={item.url}
              className="group flex items-start justify-between gap-3 px-4 py-3.5 rounded-[14px] hover:bg-white/[0.06] transition-colors duration-200"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-black text-sm text-white uppercase tracking-tight">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-white/40 leading-relaxed">
                  {item.description}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};