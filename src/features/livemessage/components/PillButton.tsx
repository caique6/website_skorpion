"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PillVariant = "solid" | "soft";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: PillVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const BASE =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-black text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS: Record<PillVariant, string> = {
  solid: "bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]",
  soft: "bg-[#1A1A1A]/[0.04] text-[#1A1A1A]/70 border border-[#1A1A1A]/10 transition-colors duration-200 hover:border-[#1A1A1A]/25 hover:text-[#1A1A1A]",
};

export const PillButton = ({
  children,
  onClick,
  type = "button",
  variant = "solid",
  disabled = false,
  fullWidth = false,
  className,
}: Props) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={cn(BASE, VARIANTS[variant], fullWidth ? "w-full" : "self-start", className)}
    >
      {variant === "solid" && (
        <span className="absolute inset-0 translate-y-full rounded-full bg-skorpion-red transition-transform duration-300 ease-out group-hover:translate-y-0" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </motion.button>
  );
};
