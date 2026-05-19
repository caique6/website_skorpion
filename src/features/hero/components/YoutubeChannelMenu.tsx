"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { HeroAction, YoutubeChannel } from "../types";

interface Props {
  action: HeroAction;
}

interface ChannelItemProps {
  channel: YoutubeChannel;
  onNavigate: () => void;
}

const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
};

const ChannelItem = ({ channel, onNavigate }: ChannelItemProps) => (
  <motion.a
    href={channel.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onNavigate}
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 360, damping: 28 }}
    className="group flex items-center gap-4 px-5 py-4 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.04] transition-colors duration-200"
  >
    <div
      className="w-2.5 h-2.5 rounded-full shrink-0"
      style={{ backgroundColor: channel.color, boxShadow: `0 0 10px ${channel.color}99` }}
    />
    <span className="font-black text-sm uppercase tracking-widest flex-1" style={{ color: channel.color }}>
      {channel.label}
    </span>
    <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-90 transition-opacity duration-200" style={{ color: channel.color }} />
  </motion.a>
);

export const YoutubeChannelMenu = ({ action }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full sm:w-auto">
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-base tracking-wide uppercase overflow-hidden whitespace-nowrap w-full sm:w-auto bg-gradient-to-r from-skorpion-red to-[#ff3b3b] text-skorpion-white shadow-[0_8px_20px_rgba(242,27,66,0.4)] hover:shadow-[0_12px_30px_rgba(242,27,66,0.6)]"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        <span className="relative z-10">{action.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative z-10 flex"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[calc(100%+10px)] left-0 w-full sm:w-72 rounded-[20px] overflow-hidden border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] z-50"
          >
            {action.channels!.map((channel) => (
              <ChannelItem key={channel.id} channel={channel} onNavigate={() => setIsOpen(false)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
