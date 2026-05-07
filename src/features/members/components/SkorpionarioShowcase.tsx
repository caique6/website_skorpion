"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Crown, ExternalLink } from "lucide-react";
import { SkorpionarioMember } from "../types";

interface Props {
  members: SkorpionarioMember[];
}

function Avatar({ member }: { member: SkorpionarioMember }) {
  const isUrl = member.avatar.startsWith("http");

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className="w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center shrink-0"
        style={{ borderColor: "rgba(242,206,22,0.35)", background: "rgba(0,0,0,0.4)" }}
      >
        {isUrl ? (
          <Image
            src={member.avatar}
            alt={member.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-xl">{member.avatar}</span>
        )}
      </div>
      <span className="text-[10px] font-black text-white/50 uppercase tracking-wide text-center max-w-[64px] truncate">
        {member.name}
      </span>
    </motion.div>
  );
}

export const SkorpionarioShowcase = ({ members }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (members.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="w-full max-w-2xl flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Crown className="w-4 h-4 text-[#F2CE16]" />
          <span className="text-[#F2CE16] font-black text-[10px] tracking-[0.35em] uppercase">
            Skorpionários
          </span>
          <Crown className="w-4 h-4 text-[#F2CE16]" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-tight">
          FAÇA COMO ELES
        </h3>
        <p className="text-white/40 text-sm font-medium leading-relaxed max-w-sm mx-auto">
          Esses membros estão no nível máximo do clube. Você também pode fazer parte.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {members.map((member) => (
          <Avatar key={member.id} member={member} />
        ))}
      </div>

      <motion.a
        href="https://www.youtube.com/@SkorpionOFICIAL/membership"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(242,206,22,0.40)" }}
        whileTap={{ scale: 0.97 }}
        className="self-center flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest text-[#0A0A0A]"
        style={{
          backgroundColor: "#F2CE16",
          boxShadow: "0 8px 32px rgba(242,206,22,0.25)",
        }}
      >
        <Crown className="w-4 h-4" />
        Quero ser Skorpionário
        <ExternalLink className="w-3.5 h-3.5" />
      </motion.a>
    </motion.div>
  );
};