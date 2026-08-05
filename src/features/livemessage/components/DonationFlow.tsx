"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDonation } from "../hooks/useDonation";
import { useVoices } from "../hooks/useVoices";
import { getDonationContent } from "../services/donation.service";
import { DonationForm } from "./DonationForm";
import { DonationPix } from "./DonationPix";
import { DonationSuccess } from "./DonationSuccess";
import { DonationVoiceCard } from "./DonationVoiceCard";
import { DonationFormData } from "../types";
import { EASE_OUT } from "@/lib/animation";

const content = getDonationContent();

export const DonationFlow = () => {
  const { state, create, reset } = useDonation();
  const voices = useVoices();
  const [voiceId, setVoiceId] = useState("");

  useEffect(() => {
    if (!voiceId && voices.length > 0) setVoiceId(voices[0].voiceId);
  }, [voices, voiceId]);

  const submit = (data: DonationFormData) => create(data, voiceId || null);
  const errorMessage = state.error ? content.errors[state.error] : null;
  const onForm =
    state.status === "idle" || state.status === "creating" || state.status === "error";
  const done =
    state.status === "published" || state.status === "approved" || state.status === "rejected";

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
      <div className="w-full lg:max-w-xl">
        <AnimatePresence mode="wait">
          {onForm && (
            <DonationForm
              key="form"
              content={content}
              onSubmit={submit}
              isCreating={state.status === "creating"}
              errorMessage={errorMessage}
            />
          )}
          {state.status === "awaiting_payment" && state.pix && (
            <DonationPix key="pix" content={content} pix={state.pix} onReset={reset} />
          )}
          {done && (
            <DonationSuccess key="done" content={content} status={state.status} onReset={reset} />
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
            className="w-full lg:w-[360px] lg:flex-shrink-0"
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
  );
};
