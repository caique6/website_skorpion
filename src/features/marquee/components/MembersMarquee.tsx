"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo, CSSProperties } from "react";
import Image from "next/image";
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
  isVisible: boolean;
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

/** Velocidade-alvo em px/s */
const SPEED_PX_PER_SEC = 55;

function MemberChip({ member, accentColor, accentBg, accentBorder }: ChipProps) {
  const isUrl = member.avatar.startsWith("http");
  return (
    <motion.div
      whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 22 } }}
      className="flex items-center p-1.5 rounded-full shrink-0 border cursor-default mx-1.5"
      style={{ backgroundColor: accentBg, borderColor: accentBorder, boxShadow: `0 0 14px ${accentBorder}` }}
    >
      {isUrl ? (
        <Image
          src={member.avatar}
          alt="Membro"
          width={40}
          height={40}
          className="rounded-full object-cover w-10 h-10 flex-shrink-0"
        />
      ) : (
        <span className="text-2xl leading-none flex-shrink-0">{member.avatar}</span>
      )}
    </motion.div>
  );
}

function MarqueeTrack({ members, direction = "left", isVisible, accentColor, accentBg, accentBorder }: TrackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null); // largura visível
  const singleRef  = useRef<HTMLDivElement>(null); // largura de 1 cópia

  const [copies,   setCopies]   = useState(6);   // quantas cópias renderizar
  const [duration, setDuration] = useState(30);  // duração da animação (s)
  const [paused,   setPaused]   = useState(false);
  const [ready,    setReady]    = useState(false); // evita flash antes da medição

  // Recalcula quando os membros ou a janela mudam
  useEffect(() => {
    const calculate = () => {
      const singleW    = singleRef.current?.offsetWidth  ?? 0;
      const containerW = wrapperRef.current?.offsetWidth ?? 0;
      if (!singleW || !containerW) return;

      // Cópias necessárias para cobrir ≥ 3× o container (margem de segurança)
      const needed = Math.max(2, Math.ceil((containerW * 3) / singleW) + 1);
      setCopies(needed);
      setDuration(singleW / SPEED_PX_PER_SEC);
      setReady(true);
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [members]);

  // CSS custom property: -(100 / copies)% = exatamente 1 cópia de distância
  const offset      = `${-(100 / copies).toFixed(4)}%`;
  const animName    = direction === "left" ? "marquee-left" : "marquee-right";
  const playState   = !isVisible || paused ? "paused" : "running";

  // Gera as cópias adicionais (cópia 0 é a "régua" de medição)
  const extraCopies = useMemo(
    () => Array.from({ length: copies - 1 }, (_, i) => i),
    [copies]
  );

  return (
    <div
      ref={wrapperRef}
      className="flex overflow-hidden w-full py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex shrink-0"
        style={{
          opacity: ready ? 1 : 0,
          "--marquee-offset": offset,
          animation: `${animName} ${duration}s linear infinite`,
          animationPlayState: playState,
        } as CSSProperties}
      >
        {/* Cópia 0 — usada para medir a largura de uma cópia */}
        <div ref={singleRef} className="flex shrink-0">
          {members.map((m, i) => (
            <MemberChip key={`s-${m.id}-${i}`} member={m} accentColor={accentColor} accentBg={accentBg} accentBorder={accentBorder} />
          ))}
        </div>

        {/* Cópias adicionais calculadas dinamicamente */}
        {extraCopies.map((ci) =>
          members.map((m, i) => (
            <MemberChip key={`${ci}-${m.id}-${i}`} member={m} accentColor={accentColor} accentBg={accentBg} accentBorder={accentBorder} />
          ))
        )}
      </div>
    </div>
  );
}

export const MembersMarquee = ({ members, label, accentColor, accentBg, accentBorder }: Props) => {
  const ref       = useRef<HTMLElement>(null);
  const isInView  = useInView(ref, { once: false, amount: 0.1 });
  const hasEntered = useInView(ref, { once: true,  amount: 0.3 });

  if (!members.length) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="w-full py-10 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={hasEntered ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center gap-4 mb-6 px-6"
      >
        <div className="h-px flex-1" style={{ backgroundColor: accentBorder }} />
        <span className="font-black text-[10px] uppercase tracking-[0.35em] shrink-0 opacity-60" style={{ color: accentColor }}>
          {label}
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: accentBorder }} />
      </motion.div>

      {/* Faixas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={hasEntered ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25 }}
        className={cn(
          "flex flex-col gap-1",
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        )}
      >
        <MarqueeTrack members={members} direction="left"  isVisible={isInView} accentColor={accentColor} accentBg={accentBg} accentBorder={accentBorder} />
        <MarqueeTrack members={members} direction="right" isVisible={isInView} accentColor={accentColor} accentBg={accentBg} accentBorder={accentBorder} />
      </motion.div>
    </motion.section>
  );
};
