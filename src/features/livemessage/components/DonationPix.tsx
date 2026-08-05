"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Loader2, RefreshCw, Timer } from "lucide-react";
import { LiveStage } from "./LiveStage";
import { DonationContent, DonationPixData } from "../types";

interface Props {
  content: DonationContent;
  pix: DonationPixData;
  onReset: () => void;
}

const formatRemaining = (ms: number): string => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const DonationPix = ({ content, pix, onReset }: Props) => {
  const [copied, setCopied] = useState(false);
  const expiresAtMs = useMemo(() => new Date(pix.expiresAt).getTime(), [pix.expiresAt]);
  const hasExpiry = Number.isFinite(expiresAtMs);
  const [remainingMs, setRemainingMs] = useState(() => expiresAtMs - Date.now());

  useEffect(() => {
    if (!hasExpiry) return;
    const tick = () => setRemainingMs(expiresAtMs - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAtMs, hasExpiry]);

  const copy = async () => {
    await navigator.clipboard.writeText(pix.qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (hasExpiry && remainingMs <= 0) {
    return (
      <LiveStage>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A] lg:text-4xl">
            {content.expiredTitle}
          </h2>
          <p className="max-w-md text-sm font-medium leading-relaxed text-[#1A1A1A]/55">
            {content.expiredSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white"
        >
          <RefreshCw className="h-4 w-4" />
          {content.newQrLabel}
        </button>
      </LiveStage>
    );
  }

  return (
    <LiveStage>
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A] lg:text-4xl">
          {content.pixTitle}
        </h2>
        <p className="max-w-md text-sm font-medium leading-relaxed text-[#1A1A1A]/55">
          {content.pixSubtitle}
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 rounded-3xl border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.02] p-6">
        {pix.qrCodeBase64 && (
          <img
            src={`data:image/png;base64,${pix.qrCodeBase64}`}
            alt="QR Code PIX"
            width={220}
            height={220}
            className="rounded-2xl"
          />
        )}

        <button
          type="button"
          onClick={copy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? content.copiedLabel : content.copyLabel}
        </button>

        {hasExpiry && (
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-skorpion-red">
            <Timer className="h-3.5 w-3.5" />
            {content.expiresLabel} {formatRemaining(remainingMs)}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          {content.waitingLabel}
        </div>
      </div>
    </LiveStage>
  );
};
