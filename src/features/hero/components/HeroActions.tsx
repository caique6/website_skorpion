"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ChannelTone, HeroActionsData } from "../types";

interface Props {
  actions: HeroActionsData;
}

const dotClass: Record<ChannelTone, string> = {
  red: "bg-skorpion-red",
  yellow: "bg-skorpion-yellow",
};

const buttonBase =
  "rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-widest";

const zoom = {
  whileHover: { scale: 1.06 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 320, damping: 18 } as const,
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
  exit: { opacity: 0, y: 10, scale: 0.96, transition: { duration: 0.15 } },
};

export const HeroActions = ({ actions }: Props) => {
  const [showChannels, setShowChannels] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative">
        <motion.button
          {...zoom}
          onClick={() => setShowChannels((value) => !value)}
          className={`${buttonBase} flex items-center gap-2 border border-skorpion-black/15 bg-skorpion-white text-skorpion-black`}
        >
          {actions.subscribed.label}
          <motion.span
            animate={{ rotate: showChannels ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" strokeWidth={3} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {showChannels && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-64 -translate-x-1/2 rounded-2xl border border-skorpion-black/10 bg-skorpion-white p-2 shadow-[0_24px_48px_rgba(26,26,26,0.16)]"
            >
              {actions.subscribed.channels.map((channel) => (
                <motion.a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-skorpion-black/[0.04]"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${dotClass[channel.tone]}`}
                    />
                    <span className="text-sm font-black uppercase tracking-tight text-skorpion-black">
                      {channel.label}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-skorpion-black/25 transition-colors group-hover:text-skorpion-black/60" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.a
        {...zoom}
        href={actions.membership.url}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-skorpion-black text-skorpion-white`}
      >
        {actions.membership.label}
      </motion.a>
    </div>
  );
};
