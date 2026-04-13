"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RankingMember, PlanTier } from "../types";
import { RankingRow } from "./RankingRow";
import { TIER_CONFIG } from "../utils/ranking.utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  members: RankingMember[];
  activeTab: PlanTier | "all";
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 28 } },
  exit: { opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.2 } },
};

const TAB_LABEL: Record<PlanTier | "all", string> = {
  all: "Ranking Geral",
  skorpionario: TIER_CONFIG.skorpionario.label,
  skorpiao: TIER_CONFIG.skorpiao.label,
  skorpionzinho: TIER_CONFIG.skorpionzinho.label,
};

export const RankingModal = ({ isOpen, onClose, members, activeTab }: Props) => {
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
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-[28px] overflow-hidden"
              style={{
                background: "rgba(12,12,12,0.98)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/08 shrink-0">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                    Ranking Completo
                  </span>
                  <h3 className="font-black text-base text-white uppercase tracking-tight">
                    {TAB_LABEL[activeTab]}
                  </h3>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-white/08 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
                >
                  <X className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {members.map((member, index) => (
                  <RankingRow
                    key={member.id}
                    member={member}
                    position={index + 1}
                    index={index}
                  />
                ))}
              </div>

              <div className="px-6 py-4 border-t border-white/08 shrink-0 flex items-center justify-between">
                <span className="text-white/25 text-xs font-bold">
                  {members.length} membros
                </span>
                <span className="text-white/25 text-[10px] font-black uppercase tracking-widest">
                  Skorpion Gamer
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};