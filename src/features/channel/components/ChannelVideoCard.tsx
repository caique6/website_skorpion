"use client";

import { motion } from "framer-motion";
import { Play, Eye, Clock } from "lucide-react";
import Image from "next/image";
import { ChannelVideo } from "../types";

interface Props {
  video: ChannelVideo;
  index: number;
}

const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};

const formatViews = (views: string) => {
  const num = Number(views);
  if (isNaN(num)) return views;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace(".0", "")}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(".0", "")}K`;
  return num.toString();
};

export const ChannelVideoCard = ({ video, index }: Props) => {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 320, damping: 26 },
      }}
      className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="relative w-full aspect-video overflow-hidden shrink-0 bg-[#0A0A0A]">
        {video.thumbnailUrl && (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: "rgba(230,25,59,0.25)" }}
        />

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/10 group-hover:bg-skorpion-red group-hover:border-skorpion-red transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
          >
            <Play className="w-5 h-5 text-skorpion-white fill-skorpion-white ml-0.5" />
          </motion.div>
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md z-30">
          <span className="text-[10px] font-black text-skorpion-white tracking-wide">
            {video.duration}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-black text-sm text-skorpion-white leading-snug line-clamp-2 group-hover:text-skorpion-white/80 transition-colors duration-200 flex-1">
          {video.title}
        </h3>

        <div className="flex items-center gap-3 pt-2 border-t border-white/05 mt-auto">
          <span className="flex items-center gap-1 text-[10px] font-black tracking-widest uppercase text-skorpion-white/40">
            <Eye className="w-3 h-3" />
            {formatViews(video.views)}
          </span>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span className="flex items-center gap-1 text-[10px] font-black tracking-widest uppercase text-skorpion-white/40">
            <Clock className="w-3 h-3" />
            {formatDate(video.publishedAt)}
          </span>
        </div>
      </div>
    </motion.a>
  );
};
