"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { EASE_OUT, TILE_FADE_UP } from "@/lib/animation";
import { ChannelVideo } from "@/features/channel/types";

interface Props {
  video: ChannelVideo;
  className?: string;
}

export const VideoTile = ({ video, className }: Props) => {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      variants={TILE_FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={`group flex flex-col overflow-hidden rounded-3xl bg-skorpion-black ${className ?? ""}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {video.thumbnailUrl && (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-skorpion-red/90 text-skorpion-white transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" strokeWidth={0} />
          </span>
        </span>
        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded-md bg-skorpion-black/80 px-2 py-0.5 text-[10px] font-black text-skorpion-white">
            {video.duration}
          </span>
        )}
      </div>

      <div className="flex flex-1 items-start p-4">
        <h3 className="line-clamp-2 text-sm font-black leading-tight text-skorpion-white">
          {video.title}
        </h3>
      </div>
    </motion.a>
  );
};
