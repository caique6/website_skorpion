"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ExternalLink, Youtube } from "lucide-react";
import { HeroAction, YoutubeChannel } from "../types";

interface Props {
  action: HeroAction;
  condensed?: boolean;
}

interface ChannelItemProps {
  channel: YoutubeChannel;
  onNavigate: () => void;
}

const SP_LAYOUT = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
} as const;

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SP_LAYOUT },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
};

const ChannelItem = ({ channel, onNavigate }: ChannelItemProps) => (
  <motion.a
    href={channel.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onNavigate}
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 360, damping: 28 }}
    className="group flex items-center gap-4 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.04] transition-colors duration-200"
  >
    <div
      className="w-2.5 h-2.5 rounded-full shrink-0"
      style={{
        backgroundColor: channel.color,
        boxShadow: `0 0 10px ${channel.color}99`,
      }}
    />
    <span
      className="font-black text-xs sm:text-sm uppercase tracking-widest flex-1"
      style={{ color: channel.color }}
    >
      {channel.label}
    </span>
    <ExternalLink
      className="w-3.5 h-3.5 opacity-40 group-hover:opacity-90 transition-opacity duration-200"
      style={{ color: channel.color }}
    />
  </motion.a>
);

export const YoutubeChannelMenu = ({ action, condensed }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[52px] sm:h-[56px] w-full sm:w-auto shrink-0 z-20"
    >
      <motion.button
        layout
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative flex items-center justify-center h-full rounded-full font-bold text-[12px] sm:text-[13px] tracking-wide uppercase overflow-hidden whitespace-nowrap bg-gradient-to-r from-skorpion-red to-[#ff3b3b] text-skorpion-white shadow-[0_8px_20px_rgba(242,27,66,0.4)] ${
          condensed ? "w-[56px] px-0" : "w-full sm:w-auto px-6 sm:px-8"
        }`}
        transition={SP_LAYOUT}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: condensed ? 1 : 0, scale: condensed ? 1 : 0.5 }}
          transition={SP_LAYOUT}
        >
          <Youtube className="w-6 h-6" strokeWidth={2.5} />
        </motion.div>

        <motion.div
          className="flex items-center gap-2 pointer-events-none"
          animate={{ opacity: condensed ? 0 : 1, scale: condensed ? 0.8 : 1 }}
          transition={SP_LAYOUT}
        >
          <span>{action.label}</span>
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={SP_LAYOUT}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          </motion.span>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && action.channels && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[calc(100%+10px)] left-0 w-full sm:w-72 rounded-[20px] overflow-hidden border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] z-50"
          >
            {action.channels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                onNavigate={() => setIsOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
