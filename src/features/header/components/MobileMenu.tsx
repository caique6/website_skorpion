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
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-[280px] z-50 flex flex-col"
            style={{
              background: "rgba(10,10,10,0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/08">
              <span className="font-black text-sm uppercase tracking-widest text-white/40">
                Menu
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </motion.button>
            </div>

            <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
              {data.nav.map((item, i) => (
                <div key={item.id}>
                  {item.anchor && !item.dropdown && (
                    <motion.div custom={i} variants={itemVariants} initial="hidden" animate="visible">
                      <Link
                        href={item.anchor}
                        onClick={onClose}
                        className="flex items-center justify-between px-4 py-4 rounded-[14px] hover:bg-white/[0.06] transition-colors duration-200"
                      >
                        <span className="font-black text-base text-white uppercase tracking-tight">
                          {item.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/20" />
                      </Link>
                    </motion.div>
                  )}

                  {item.dropdown && (
                    <motion.div custom={i} variants={itemVariants} initial="hidden" animate="visible">
                      <div className="px-4 pt-4 pb-2">
                        <span className="font-black text-xs uppercase tracking-widest text-white/30">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.dropdown.map((drop) => (
                          <Link
                            key={drop.id}
                            href={drop.url}
                            onClick={onClose}
                            className="group flex items-start justify-between gap-3 px-4 py-3 rounded-[14px] hover:bg-white/[0.06] transition-colors duration-200"
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="font-black text-sm text-white uppercase tracking-tight">
                                {drop.label}
                              </span>
                              <span className="text-xs font-medium text-white/35 leading-relaxed">
                                {drop.description}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 shrink-0 mt-0.5" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 py-6 border-t border-white/08">
              <Link
                href="/resgatar"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-skorpion-red font-black text-sm text-white uppercase tracking-wider"
              >
                Resgatar Benefícios
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};