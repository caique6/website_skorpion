"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Image from "next/image";
import { OVERLAY_TIER } from "../../utils/tier-accent";
import { OverlayAlert } from "../../types";

interface Props {
  alert: OverlayAlert;
}

export const OverlayAlertCard = ({ alert }: Props) => {
  const tier = OVERLAY_TIER[alert.tier];
  const leaving = alert.state === "exiting";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)", y: -8 }}
      animate={
        leaving
          ? { opacity: 0, scale: 0.96, filter: "blur(10px)", y: -8 }
          : { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative flex max-w-lg items-start gap-4 overflow-hidden rounded-2xl px-5 py-4"
      style={{
        backgroundColor: "rgba(20,16,28,0.86)",
        border: `1.5px solid ${tier.color}`,
        boxShadow: `0 0 38px 4px ${tier.glow}, 0 12px 40px rgba(0,0,0,0.5)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <span className="card-shine" />
      <Zap
        className="overlay-bolt pointer-events-none absolute right-3 top-3 h-5 w-5"
        style={{ color: tier.color }}
        fill="currentColor"
      />
      <Zap
        className="overlay-bolt pointer-events-none absolute right-7 top-7 h-3 w-3 opacity-70"
        style={{ color: tier.color, animationDelay: "0.5s" }}
        fill="currentColor"
      />

      <div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-black"
        style={{ backgroundColor: `${tier.color}22`, border: `2px solid ${tier.color}`, color: tier.color }}
      >
        {alert.avatarUrl ? (
          <Image
            src={alert.avatarUrl}
            alt={alert.memberName}
            width={48}
            height={48}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          alert.memberName.charAt(0).toUpperCase()
        )}
      </div>

      <div className="relative flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-black uppercase tracking-tight text-white">
            {alert.memberName}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
            style={{ backgroundColor: tier.color, color: "#1A1A1A" }}
          >
            <Zap className="h-2.5 w-2.5" fill="currentColor" />
            {tier.label}
          </span>
          <span className="text-[12px] font-medium text-white/45">mandou um recado</span>
        </div>
        <p className="break-words text-[15px] font-medium leading-snug text-white/90">
          &ldquo;{alert.message}&rdquo;
        </p>
      </div>
    </motion.div>
  );
};
