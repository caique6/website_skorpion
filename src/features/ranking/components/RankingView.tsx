"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";
import { RankingData, PlanTier } from "../types";
import { sortByTime, TIER_CONFIG } from "../utils/ranking.utils";
import { PodiumCard } from "./PodiumCard";
import { RankingRow } from "./RankingRow";
import { RankingModal } from "./RankingModal";

interface Props {
  data: RankingData;
}

type ActiveTab = PlanTier | "all";

const TABS: { id: ActiveTab; label: string }[] = [
  { id: "all", label: "Geral" },
  { id: "skorpionario", label: "Skorpionário" },
  { id: "skorpiao", label: "Skorpião" },
  { id: "skorpionzinho", label: "Skorpionzinho" },
];

const VISIBLE_COUNT = 10;

export const RankingView = ({ data }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const sorted = sortByTime(data.members);

  const filtered = activeTab === "all"
    ? sorted
    : sorted.filter((m) => m.tier === activeTab);

  const podium = filtered.slice(0, 3);
  const listMembers = filtered.slice(3, VISIBLE_COUNT + 3);
  const modalMembers = filtered.slice(0, 25);

  const accentColor = activeTab !== "all"
    ? TIER_CONFIG[activeTab].color
    : "#F2CE16";

  return (
    <div
      className="min-h-screen w-full flex flex-col px-4 md:px-8 lg:px-16 py-12 lg:py-20 relative overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(242,206,22,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-10 lg:gap-14">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="flex items-center justify-between"
        >
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-widest">Voltar</span>
          </motion.button>

          <div className="flex items-center gap-2 text-white/30">
            <Trophy className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em]">
              Sala de Troféus
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.05 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
            RANKING
          </h1>
          <p className="text-white/35 text-sm lg:text-base font-medium">
            Os membros mais leais da comunidade Skorpion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.1 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const color = tab.id !== "all" ? TIER_CONFIG[tab.id].color : "#F2CE16";
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-widest border transition-colors duration-200"
                style={{
                  color: isActive ? color : "rgba(255,255,255,0.35)",
                  backgroundColor: isActive ? `${color}12` : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? `${color}35` : "rgba(255,255,255,0.08)",
                }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: `${color}08` }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="flex flex-col gap-10"
          >
            {podium.length >= 3 && (
              <div className="flex flex-col gap-2">
                <span className="text-white/25 text-[10px] font-black uppercase tracking-[0.3em] text-center">
                  Pódio
                </span>
                <div className="flex items-end justify-center gap-4 lg:gap-8 pt-4">
                  {podium.map((member, index) => (
                    <PodiumCard
                      key={member.id}
                      member={member}
                      position={index + 1}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {listMembers.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-white/25 text-[10px] font-black uppercase tracking-[0.3em]">
                  Classificação
                </span>
                <div className="flex flex-col gap-2">
                  {listMembers.map((member, index) => (
                    <RankingRow
                      key={member.id}
                      member={member}
                      position={index + 4}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {filtered.length > VISIBLE_COUNT + 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <motion.button
                  onClick={() => setModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest border transition-all duration-300"
                  style={{
                    color: accentColor,
                    backgroundColor: `${accentColor}08`,
                    borderColor: `${accentColor}25`,
                  }}
                >
                  Ver ranking completo
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-4">
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.08), transparent)" }}
          />
          <span className="text-white/15 text-[10px] font-black uppercase tracking-[0.35em] shrink-0">
            Skorpion Gamer
          </span>
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.08), transparent)" }}
          />
        </div>
      </div>

      <RankingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        members={modalMembers}
        activeTab={activeTab}
      />
    </div>
  );
};