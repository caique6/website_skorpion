"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLiveMessage } from "../hooks/useLiveMessage";
import { useVoices } from "../hooks/useVoices";
import { getLiveMessageContent } from "../services/livemessage.service";
import { LiveMessageForm } from "./LiveMessageForm";
import { LiveMessagePreview } from "./LiveMessagePreview";
import { LiveMessageCooldown } from "./LiveMessageCooldown";
import { LiveMessageSuccess } from "./LiveMessageSuccess";
import { LiveMessageInfoCard } from "./LiveMessageInfoCard";
import { DonationVoiceCard } from "./DonationVoiceCard";
import { LiveMessageFormData } from "../types";
import { EASE_OUT } from "@/lib/animation";

const content = getLiveMessageContent();

export const MessageFlow = () => {
  const { state, submit, confirm, reset } = useLiveMessage();
  const voices = useVoices();
  const [voiceId, setVoiceId] = useState("");

  useEffect(() => {
    if (!voiceId && voices.length > 0) setVoiceId(voices[0].voiceId);
  }, [voices, voiceId]);

  const onSubmit = (data: LiveMessageFormData) => submit(data, voiceId || null);
  const onForm =
    state.status === "idle" || state.status === "validating" || state.status === "error";
  const errorMessage = state.error ? content.errors[state.error] : null;

  return (
    <div className="flex w-full flex-col gap-6 pt-8 md:gap-8 md:pt-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="w-full lg:flex-1">
          <AnimatePresence mode="wait">
            {onForm && (
              <LiveMessageForm
                key="form"
                content={content}
                onSubmit={onSubmit}
                isValidating={state.status === "validating"}
                errorMessage={errorMessage}
              />
            )}
            {(state.status === "previewing" || state.status === "submitting") && state.preview && (
              <LiveMessagePreview
                key="preview"
                content={content}
                preview={state.preview}
                onConfirm={confirm}
                onBack={reset}
                isSubmitting={state.status === "submitting"}
              />
            )}
            {state.status === "blocked" && state.cooldownMs !== null && (
              <LiveMessageCooldown
                key="cooldown"
                content={content}
                cooldownMs={state.cooldownMs}
                onReset={reset}
              />
            )}
            {state.status === "success" && (
              <LiveMessageSuccess key="success" content={content} onReset={reset} />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {onForm && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: EASE_OUT },
              }}
              exit={{ opacity: 0, x: 24, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE_OUT } }}
              className="w-full lg:w-[340px] lg:flex-shrink-0"
            >
              <DonationVoiceCard
                availableVoiceIds={voices.map((voice) => voice.voiceId)}
                voiceId={voiceId}
                label={content.voiceLabel}
                hint={content.voiceHint}
                onSelect={setVoiceId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {onForm && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, delay: 0.08, ease: EASE_OUT },
            }}
            exit={{ opacity: 0, y: 20, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE_OUT } }}
            className="w-full"
          >
            <LiveMessageInfoCard content={content.info} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
