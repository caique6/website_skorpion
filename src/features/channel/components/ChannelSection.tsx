"use client";

import { motion } from "framer-motion";
import { Youtube, ExternalLink } from "lucide-react";
import { ChannelData, ChannelStats } from "../types";
import { ChannelStatCard } from "./ChannelStatCard";
import { ChannelVideoCard } from "./ChannelVideoCard";

interface Props {
  data: ChannelData;
}

const STAT_LABELS: Record<keyof ChannelStats, string> = {
  subscribers: "Inscritos",
  totalViews: "Visualizações",
  totalVideos: "Vídeos",
};

type StatEntry = [keyof ChannelStats, string];

function getStatEntries(stats: ChannelStats): StatEntry[] {
  return Object.entries(stats) as StatEntry[];
}

export const ChannelSection = ({ data }: Props) => {
  const statEntries = getStatEntries(data.stats);

  return (
    <section className="relative w-full flex items-center justify-center py-12 lg:py-16 px-4 md:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-full max-w-5xl relative z-10 rounded-[28px] lg:rounded-[32px] overflow-hidden flex flex-col p-6 sm:p-8 md:p-10 gap-8 lg:gap-10 shadow-2xl"
        style={{
          backgroundColor: "rgba(15, 15, 15, 0.75)",
          backdropFilter: "blur(40px) saturate(150%)",
          WebkitBackdropFilter: "blur(40px) saturate(150%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(230,25,59,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: 0.1,
            }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-skorpion-white/40">
              <Youtube className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                O Canal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-skorpion-white uppercase tracking-tight leading-[1.05]">
              NÚMEROS QUE FALAM
            </h2>
          </motion.div>

          <motion.a
            href="https://www.youtube.com/@SkorpionOFICIAL"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: 0.15,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-skorpion-white/60">
              Ver canal
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-skorpion-white/40" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 relative z-10">
          {statEntries.map(([key, value], index) => (
            <ChannelStatCard
              key={key}
              label={STAT_LABELS[key]}
              value={value}
              index={index}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-skorpion-white uppercase tracking-tight">
              Últimos Vídeos
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.videos.map((video, index) => (
              <ChannelVideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
