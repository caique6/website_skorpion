"use client";

import { Eye, Volume2 } from "lucide-react";
import { LiveStage } from "./LiveStage";
import { LiveMessageHeading } from "./LiveMessageHeading";
import { AlertPreviewCard } from "./AlertPreviewCard";
import { PillButton } from "./PillButton";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { LiveMessageContent, LiveMessagePreview as PreviewData } from "../types";

interface Props {
  content: LiveMessageContent;
  preview: PreviewData;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const LiveMessagePreview = ({ content, preview, onConfirm, onBack, isSubmitting }: Props) => {
  const { play, isPlaying } = useTextToSpeech();
  const copy = content.preview;

  return (
    <LiveStage>
      <LiveMessageHeading
        icon={Eye}
        eyebrow={copy.eyebrow}
        lines={copy.headlineLines}
        subtitle={copy.subtitle}
      />

      <AlertPreviewCard
        name={preview.memberName}
        avatarUrl={preview.memberAvatarUrl}
        tier={preview.tier}
        message={preview.message}
        suffix={copy.alertSuffix}
      />

      <div className="flex flex-col gap-3">
        <PillButton
          variant="soft"
          fullWidth
          onClick={() => play(`${preview.memberName} disse: ${preview.message}`)}
          disabled={isPlaying}
        >
          <Volume2 className="h-4 w-4" />
          {isPlaying ? copy.listeningLabel : copy.listenLabel}
        </PillButton>

        <div className="flex gap-3">
          <PillButton variant="soft" className="flex-1" onClick={onBack} disabled={isSubmitting}>
            {copy.backLabel}
          </PillButton>
          <PillButton className="flex-1" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? copy.confirmLoadingLabel : copy.confirmLabel}
          </PillButton>
        </div>
      </div>
    </LiveStage>
  );
};
