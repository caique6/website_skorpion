"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MarqueeMember } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  members: MarqueeMember[];
  label: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

interface TrackProps {
  members: MarqueeMember[];
  direction?: "left" | "right";
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

interface ChipProps {
  member: MarqueeMember;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

function MemberChip({ member, accentColor, accentBg, accentBorder }: ChipProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      className="flex items-center gap-2.5 px-5 py-2.5 rounded-full shrink-0 border cursor-default"
      style={{
        backgroundColor: accentBg,
        borderColor: accentBorder,
        boxShadow: `0 0 12px ${accentBorder}`,
      }}
    >
      <span className="text-sm leading-none">{member.avatar}</span>
      <span
        className="font-black text-[11px] tracking-widest uppercase whitespace-nowrap"
        style={{ color: accentColor }}
      >
        {member.name}
      </span>
      <span
        className="font-black text-[10px] opacity-40"
        style={{ color: accentColor }}
      >
        ✦
      </span>
    </motion.div>
  );
}

function MarqueeTrack({ members, direction = "left", accentColor, accentBg, accentBorder }: TrackProps) {
  const duplicated = [...members, ...members, ...members];
  const animateX = direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"];

  return (
    <div className="flex overflow-hidden w-full">
      <motion.div
        animate={{ x: animateX }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 shrink-0"
      >
        {duplicated.map((member, index) => (
          <MemberChip
            key={`${member.id}-${index}`}
            member={member}
            accentColor={accentColor}
            accentBg={accentBg}
            accentBorder={accentBorder}
          />
        ))}
      </motion.div>
    </div>
  );
}

export const MembersMarquee = ({ members, label, accentColor, accentBg, accentBorder }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="w-full py-10 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.1 }}
        className="flex items-center gap-4 mb-6 px-6"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="h-px flex-1 origin-left"
          style={{ backgroundColor: accentBorder }}
        />
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={isInView ? { opacity: 0.6, letterSpacing: "0.35em" } : { opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="font-black text-[10px] uppercase shrink-0"
          style={{ color: accentColor }}
        >
          {label}
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="h-px flex-1 origin-right"
          style={{ backgroundColor: accentBorder }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className={cn(
          "flex flex-col gap-3",
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        )}
      >
        <MarqueeTrack
          members={members}
          direction="left"
          accentColor={accentColor}
          accentBg={accentBg}
          accentBorder={accentBorder}
        />
        <MarqueeTrack
          members={members}
          direction="right"
          accentColor={accentColor}
          accentBg={accentBg}
          accentBorder={accentBorder}
        />
      </motion.div>
    </motion.section>
  );
};