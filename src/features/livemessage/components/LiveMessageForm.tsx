"use client";

import { useState } from "react";
import { KeyRound, MessageSquare, Radio, User } from "lucide-react";
import { LiveStage } from "./LiveStage";
import { LiveMessageHeading } from "./LiveMessageHeading";
import { ErrorBox } from "./ErrorBox";
import { PillButton } from "./PillButton";
import { LiveMessageContent, LiveMessageFormData } from "../types";

interface Props {
  content: LiveMessageContent;
  onSubmit: (data: LiveMessageFormData) => void;
  isValidating: boolean;
  errorMessage: string | null;
}

const FIELD_BASE =
  "w-full rounded-2xl border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.02] px-5 py-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/20 transition-colors duration-200 focus:border-[#1A1A1A]/30 focus:outline-none";

const LABEL_BASE =
  "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40";

export const LiveMessageForm = ({ content, onSubmit, isValidating, errorMessage }: Props) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <LiveStage>
      <LiveMessageHeading
        icon={Radio}
        eyebrow={content.eyebrow}
        lines={content.headlineLines}
        subtitle={content.subtitle}
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <label className={LABEL_BASE}>
            <KeyRound className="h-3.5 w-3.5" />
            {content.codeLabel}
          </label>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            placeholder={content.codePlaceholder}
            className={`${FIELD_BASE} font-mono uppercase tracking-widest`}
          />
        </div>

        <div className="flex flex-col gap-2.5">
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

        <div className="flex flex-col gap-2.5">
          <label className={LABEL_BASE}>
            <MessageSquare className="h-3.5 w-3.5" />
            {content.messageLabel}
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={content.messagePlaceholder}
            rows={3}
            maxLength={content.messageMaxLength}
            className={`${FIELD_BASE} resize-none font-medium leading-relaxed`}
          />
          <span className="self-end text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
            {message.length} / {content.messageMaxLength}
          </span>
        </div>

        {errorMessage && <ErrorBox message={errorMessage} />}
      </div>

      <PillButton onClick={() => onSubmit({ code, name, message })} disabled={isValidating}>
        {isValidating ? content.submitLoadingLabel : content.submitLabel}
      </PillButton>
    </LiveStage>
  );
};
