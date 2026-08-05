"use client";

import { useState } from "react";
import Link from "next/link";
import { HandCoins, MessageSquare, User } from "lucide-react";
import { LiveStage } from "./LiveStage";
import { LiveMessageHeading } from "./LiveMessageHeading";
import { ErrorBox } from "./ErrorBox";
import { PillButton } from "./PillButton";
import { formatBRL } from "../utils/format-brl";
import { DonationContent, DonationFormData } from "../types";

interface Props {
  content: DonationContent;
  onSubmit: (data: DonationFormData) => void;
  isCreating: boolean;
  errorMessage: string | null;
}

const FIELD_BASE =
  "w-full rounded-2xl border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.02] px-5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/20 transition-colors duration-200 focus:border-[#1A1A1A]/30 focus:outline-none";

const AMOUNT_FIELD =
  "w-full rounded-2xl border-2 border-skorpion-red/20 bg-skorpion-red/[0.03] px-5 py-2.5 text-xl font-black tracking-tight text-skorpion-red placeholder:text-skorpion-red/25 transition-colors duration-200 focus:border-skorpion-red/50 focus:outline-none";

const LABEL_BASE =
  "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40";

const toCents = (value: string): number => {
  const parsed = Number(value.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
};

export const DonationForm = ({ content, onSubmit, isCreating, errorMessage }: Props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");

  const amountCents = toCents(amount);

  return (
    <LiveStage>
      <LiveMessageHeading
        icon={HandCoins}
        eyebrow={content.eyebrow}
        lines={content.headlineLines}
        subtitle={content.subtitle}
      />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className={LABEL_BASE}>
            <HandCoins className="h-3.5 w-3.5" />
            {content.amountLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {content.presetsCents.map((cents) => (
              <button
                key={cents}
                type="button"
                onClick={() => setAmount((cents / 100).toFixed(2).replace(".", ","))}
                className={`rounded-full border-2 px-4 py-2 text-sm font-black transition-colors duration-200 ${
                  amountCents === cents
                    ? "border-skorpion-red bg-skorpion-red/10 text-skorpion-red"
                    : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/25"
                }`}
              >
                {formatBRL(cents)}
              </button>
            ))}
          </div>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder={content.amountPlaceholder}
            inputMode="decimal"
            className={AMOUNT_FIELD}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={LABEL_BASE}>
            <User className="h-3.5 w-3.5" />
            {content.nameLabel}
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={content.namePlaceholder}
            maxLength={content.nameMaxLength}
            className={FIELD_BASE}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={LABEL_BASE}>
            <MessageSquare className="h-3.5 w-3.5" />
            {content.messageLabel}
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={content.messagePlaceholder}
            rows={2}
            maxLength={content.messageMaxLength}
            className={`${FIELD_BASE} resize-none font-medium leading-relaxed`}
          />
          <span className="self-end text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
            {message.length} / {content.messageMaxLength}
          </span>
        </div>

        <p className="text-[11px] font-medium leading-relaxed text-[#1A1A1A]/40">
          {content.termsPrefix}{" "}
          <Link
            href="/termos"
            className="font-bold text-skorpion-red underline-offset-2 hover:underline"
          >
            {content.termsLinkLabel}
          </Link>
          .
        </p>

        {errorMessage && <ErrorBox message={errorMessage} />}
      </div>

      <PillButton
        onClick={() => onSubmit({ name, message, amountCents })}
        disabled={isCreating}
      >
        {isCreating ? content.submitLoadingLabel : content.submitLabel}
      </PillButton>
    </LiveStage>
  );
};
