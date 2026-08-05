"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLiveMessage } from "../hooks/useLiveMessage";
import { getLiveMessageContent } from "../services/livemessage.service";
import { LiveMessageForm } from "./LiveMessageForm";
import { LiveMessagePreview } from "./LiveMessagePreview";
import { LiveMessageCooldown } from "./LiveMessageCooldown";
import { LiveMessageSuccess } from "./LiveMessageSuccess";
import { LiveMessageInfoCard } from "./LiveMessageInfoCard";
import { EASE_OUT } from "@/lib/animation";

const content = getLiveMessageContent();

export const MessageFlow = () => {
  const { state, submit, confirm, reset } = useLiveMessage();
  const onForm =
    state.status === "idle" || state.status === "validating" || state.status === "error";
  const errorMessage = state.error ? content.errors[state.error] : null;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
      <div className="w-full lg:max-w-xl">
        <AnimatePresence mode="wait">
          {onForm && (
            <LiveMessageForm
              key="form"
              content={content}
              onSubmit={submit}
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
            key="info"
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
            <LiveMessageInfoCard content={content.info} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
