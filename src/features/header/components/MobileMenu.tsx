"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { HeaderData } from "../types";

interface Props {
  data: HeaderData;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 32 } },
  exit: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 32 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 280, damping: 26, delay: i * 0.07 },
  }),
};

export const MobileMenu = ({ data, isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: "rgba(26,26,26,0.45)",
              backdropFilter: "blur(4px)",
            }}
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-[280px] z-50 flex flex-col bg-skorpion-white border-l border-skorpion-black/10"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-skorpion-black/10">
              <span className="font-black text-sm uppercase tracking-widest text-skorpion-black/40">
                Menu
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-skorpion-black/5 flex items-center justify-center text-skorpion-black/60"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </motion.button>
            </div>

            <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
              {data.nav.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between gap-3 px-4 py-4 rounded-[14px] hover:bg-skorpion-red/5 transition-colors duration-200"
                  >
                    <span className="font-black text-base text-skorpion-black uppercase tracking-tight group-hover:text-skorpion-red transition-colors duration-200">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-skorpion-black/20" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="px-6 py-6 border-t border-skorpion-black/10">
              <Link
                href={data.cta.href}
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-skorpion-black font-black text-sm text-skorpion-white uppercase tracking-wider"
              >
                {data.cta.label}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
