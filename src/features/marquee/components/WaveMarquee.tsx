"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { isImageSrc, proxyAvatarUrl } from "@/lib/avatar";
import { MarqueeMember } from "../types";
import { WaveDivider } from "./WaveDivider";

type MarqueeTone = "yellow" | "white" | "gray";

interface Props {
  members: MarqueeMember[];
  label: string;
  tone?: MarqueeTone;
  showWave?: boolean;
}

const SPEED_PX_PER_SECOND = 55;
const MAX_VISIBLE_MEMBERS = 30;

const toneClass: Record<
  MarqueeTone,
  { text: string; line: string; soft: string }
> = {
  yellow: {
    text: "text-skorpion-yellow",
    line: "bg-skorpion-yellow/40",
    soft: "bg-gradient-to-r from-transparent via-skorpion-yellow/50 to-transparent",
  },
  white: {
    text: "text-skorpion-white",
    line: "bg-skorpion-white/40",
    soft: "bg-gradient-to-r from-transparent via-skorpion-white/50 to-transparent",
  },
  gray: {
    text: "text-gray-300",
    line: "bg-gray-300/40",
    soft: "bg-gradient-to-r from-transparent via-gray-300/50 to-transparent",
  },
};

const MemberChip = ({ member }: { member: MarqueeMember }) => {
  const src = proxyAvatarUrl(member.avatar, member.id);

  return (
    <div className="wave-chip relative mx-2 shrink-0">
      {isImageSrc(src) ? (
        <Image
          src={src}
          alt={member.name}
          width={64}
          height={64}
          className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
        />
      ) : (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-skorpion-white/10 text-2xl sm:h-16 sm:w-16">
          {member.avatar}
        </span>
      )}
    </div>
  );
};

export const WaveMarquee = ({
  members,
  label,
  tone = "yellow",
  showWave = true,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);
  const [duration, setDuration] = useState(20);
  const [ready, setReady] = useState(false);

  const visibleMembers = useMemo(
    () => members.slice(0, MAX_VISIBLE_MEMBERS),
    [members],
  );

  useEffect(() => {
    const measure = () => {
      const singleWidth = singleRef.current?.offsetWidth ?? 0;
      const containerWidth = wrapperRef.current?.offsetWidth ?? 0;
      if (!singleWidth || !containerWidth) return;
      setCopies(Math.max(2, Math.ceil((containerWidth * 3) / singleWidth) + 1));
      setDuration(singleWidth / SPEED_PX_PER_SECOND);
      setReady(true);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleMembers]);

  const extraCopies = useMemo(
    () => Array.from({ length: copies - 1 }, (_, index) => index),
    [copies],
  );

  if (!visibleMembers.length) return null;

  const tones = toneClass[tone];

  const trackStyle = {
    opacity: ready ? 1 : 0,
    animationDuration: `${duration}s`,
    "--marquee-offset": `${-(100 / copies).toFixed(4)}%`,
  } as CSSProperties;

  return (
    <section className="relative w-full overflow-hidden bg-skorpion-red">
      {showWave && <WaveDivider />}
      <div
        className={`flex flex-col items-center gap-7 px-6 pb-20 sm:pb-24 ${
          showWave ? "pt-24 sm:pt-28" : "pt-16 sm:pt-20"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className={`h-px w-10 sm:w-16 ${tones.line}`} />
          <span
            className={`text-sm font-black uppercase tracking-[0.4em] sm:text-base ${tones.text}`}
          >
            {label}
          </span>
          <span className={`h-px w-10 sm:w-16 ${tones.line}`} />
        </div>

        <div
          ref={wrapperRef}
          className="wave-row w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="wave-track flex w-max" style={trackStyle}>
            <div ref={singleRef} className="flex shrink-0">
              {visibleMembers.map((member) => (
                <MemberChip key={member.id} member={member} />
              ))}
            </div>
            {extraCopies.map((copyIndex) => (
              <div key={copyIndex} className="flex shrink-0" aria-hidden>
                {visibleMembers.map((member) => (
                  <MemberChip key={`${copyIndex}-${member.id}`} member={member} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <span className={`h-px w-48 sm:w-72 ${tones.soft}`} />
      </div>
    </section>
  );
};
