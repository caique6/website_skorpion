"use client";

import { motion } from "framer-motion";
import { Eye, Video } from "lucide-react";
import { EASE_OUT } from "@/lib/animation";
import { ShowcaseData } from "../types";
import { ChannelTile } from "./ChannelTile";
import { StatTile } from "./StatTile";
import { VideoTile } from "./VideoTile";
import { ProductTile } from "./ProductTile";
import { ComingSoonTile } from "./ComingSoonTile";

interface Props {
  data: ShowcaseData;
}

const VIDEO_LIMIT = 3;
const CONTENT_CELLS = 6;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const ChannelStoreSection = ({ data }: Props) => {
  const { content, stats, videos, products } = data;
  const featuredProduct = products[0];
  const recentVideos = videos.slice(0, VIDEO_LIMIT);

  const usedCells = (featuredProduct ? 2 : 0) + recentVideos.length;
  const comingSoon = Math.max(CONTENT_CELLS - usedCells, 0);

  return (
    <section className="w-full bg-skorpion-red px-6 py-20 sm:py-28">
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="text-xs font-black uppercase tracking-[0.4em] text-skorpion-yellow">
          {content.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-skorpion-white sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 text-base font-medium leading-relaxed text-skorpion-white/70">
          {content.subtitle}
        </p>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-20">
        <ChannelTile
          value={stats.subscribers}
          label={content.subscribersLabel}
          url={content.channelUrl}
        />
        <StatTile
          value={stats.totalViews}
          label={content.viewsLabel}
          tone="yellow"
          icon={Eye}
        />
        <StatTile
          value={stats.totalVideos}
          label={content.videosLabel}
          tone="white"
          icon={Video}
        />
      </div>

      <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3">
        {featuredProduct && (
          <ProductTile product={featuredProduct} className="row-span-2" />
        )}
        {recentVideos.map((video) => (
          <VideoTile key={video.id} video={video} />
        ))}
        {Array.from({ length: comingSoon }).map((_, index) => (
          <ComingSoonTile
            key={`coming-soon-${index}`}
            label={content.comingSoonLabel}
          />
        ))}
      </div>
    </section>
  );
};
