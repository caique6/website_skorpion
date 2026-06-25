"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LucideIcon, MessageCircle, Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeaderCta, HeaderCtaIcon } from "../types";

const ICONS: Record<HeaderCtaIcon, LucideIcon> = {
  whatsapp: MessageCircle,
  live: Radio,
};

const panelVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.15 } },
};

interface Props {
  cta: HeaderCta;
}

export const CtaMenu = ({ cta }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <motion.button
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 rounded-full bg-skorpion-black px-5 py-2.5 text-xs font-black uppercase tracking-widest text-skorpion-white"
      >
        {cta.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full z-50 mt-3 w-72 origin-top-right rounded-2xl border border-skorpion-black/10 bg-skorpion-white p-2 shadow-[0_12px_40px_rgba(26,26,26,0.16)]"
          >
            {cta.options.map((option) => {
              const Icon = ICONS[option.icon];
              return (
                <Link
                  key={option.id}
                  href={option.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-skorpion-red/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-skorpion-black/[0.04] text-skorpion-black/60 transition-colors duration-200 group-hover:bg-skorpion-red/10 group-hover:text-skorpion-red">
                    <Icon className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs font-black uppercase tracking-widest text-skorpion-black transition-colors duration-200 group-hover:text-skorpion-red">
                      {option.label}
                    </span>
                    <span className="text-[11px] font-medium leading-snug text-skorpion-black/50">
                      {option.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
