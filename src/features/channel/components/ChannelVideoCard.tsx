"use client";

import { motion } from "framer-motion";
import { Play, Eye, Clock } from "lucide-react";
import { ChannelVideo } from "../types";

interface Props {
  video: ChannelVideo;
  index: number;
}

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
      className="group relative flex flex-col rounded-[16px] overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="relative w-full aspect-video overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(230,25,59,0.25) 0%, rgba(10,10,10,0.9) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(230,25,59,0.4) 0%, rgba(10,10,10,0.7) 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.7 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/10 group-hover:bg-skorpion-red group-hover:border-skorpion-red transition-colors duration-300"
          >
            <Play className="w-4 h-4 text-skorpion-white fill-skorpion-white ml-0.5" />
          </motion.div>
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm">
          <span className="text-[10px] font-black text-skorpion-white tracking-wide">
            {video.duration}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3.5">
        <h3 className="font-black text-xs text-skorpion-white leading-snug line-clamp-2 group-hover:text-skorpion-white/80 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-skorpion-white/35">
          <span className="flex items-center gap-1 text-[10px] font-bold">
            <Eye className="w-3 h-3" />
            {video.views}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold">
            <Clock className="w-3 h-3" />
            {video.publishedAt}
          </span>
        </div>
      </div>
    </motion.a>
  );
};