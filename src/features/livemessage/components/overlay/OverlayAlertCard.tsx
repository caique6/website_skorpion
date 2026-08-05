"use client";

import { motion, Variants } from "framer-motion";
import { Zap } from "lucide-react";
import Image from "next/image";
import { OVERLAY_DONATION, OVERLAY_TIER } from "../../utils/tier-accent";
import { formatBRL } from "../../utils/format-brl";
import { RESGATY_CREDIT } from "../../utils/resgaty";
import { OverlayAlert } from "../../types";
import { EASE_OUT } from "@/lib/animation";

interface Props {
  alert: OverlayAlert;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -90, scale: 0.82, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT, delayChildren: 0.35, staggerChildren: 0.26 },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.9,
    filter: "blur(14px)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const avatarVariants: Variants = {
  hidden: { scale: 0, rotate: -170, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 170, damping: 12 },
  },
  exit: { scale: 0, rotate: 80, opacity: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

const headerVariants: Variants = {
  hidden: { y: -26, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE_OUT } },
  exit: { y: -16, opacity: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

const messageVariants: Variants = {
  hidden: { x: 48, opacity: 0, filter: "blur(10px)" },
  visible: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.95, ease: EASE_OUT } },
  exit: { x: 28, opacity: 0, filter: "blur(8px)", transition: { duration: 0.4, ease: EASE_OUT } },
};

const creditVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const OverlayAlertCard = ({ alert }: Props) => {
  const isDonation = alert.kind === "donation";
  const tier = isDonation ? OVERLAY_DONATION : OVERLAY_TIER[alert.tier ?? "skorpionzinho"];
  const leaving = alert.state === "exiting";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={leaving ? "exit" : "visible"}
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

      <motion.div
        variants={avatarVariants}
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
      </motion.div>

      <div className="relative flex min-w-0 flex-col gap-1">
        <motion.div variants={headerVariants} className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-black uppercase tracking-tight text-white">
            {alert.memberName}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
            style={{ backgroundColor: tier.color, color: "#1A1A1A" }}
          >
            <Zap className="h-2.5 w-2.5" fill="currentColor" />
            {isDonation && alert.amountCents != null ? formatBRL(alert.amountCents) : tier.label}
          </span>
          <span className="text-[12px] font-medium text-white/45">
            {isDonation ? "mandou um pix" : "mandou um recado"}
          </span>
        </motion.div>
        <motion.p
          variants={messageVariants}
          className="break-words text-[15px] font-medium leading-snug text-white/90"
        >
          &ldquo;{alert.message}&rdquo;
        </motion.p>
        {isDonation && (
          <motion.span
            variants={creditVariants}
            className="mt-1 text-[9px] font-black uppercase tracking-widest text-white/30"
          >
            {RESGATY_CREDIT}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};
