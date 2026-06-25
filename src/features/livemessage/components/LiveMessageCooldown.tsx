"use client";

import { Clock } from "lucide-react";
import { LiveStage } from "./LiveStage";
import { LiveMessageHeading } from "./LiveMessageHeading";
import { PillButton } from "./PillButton";
import { useCountdown } from "../hooks/useCountdown";
import { LiveMessageContent } from "../types";

interface Props {
  content: LiveMessageContent;
  cooldownMs: number;
  onReset: () => void;
}

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.02] text-3xl font-black tabular-nums text-[#1A1A1A]">
      {String(value).padStart(2, "0")}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span className="pb-6 text-2xl font-black text-[#1A1A1A]/15">:</span>
);

export const LiveMessageCooldown = ({ content, cooldownMs, onReset }: Props) => {
  const { hours, minutes, seconds } = useCountdown(cooldownMs, onReset);
  const copy = content.cooldown;
  const showHours = hours > 0;

  return (
    <LiveStage>
      <LiveMessageHeading
        icon={Clock}
        eyebrow={copy.eyebrow}
        lines={copy.headlineLines}
        subtitle={copy.subtitle}
      />

      <div className="flex items-center gap-3">
        {showHours && (
          <>
            <Cell value={hours} label="Horas" />
            <Separator />
          </>
        )}
        <Cell value={minutes} label="Min" />
        <Separator />
        <Cell value={seconds} label="Seg" />
      </div>

      <PillButton variant="soft" onClick={onReset}>
        {copy.resetLabel}
      </PillButton>
    </LiveStage>
  );
};
