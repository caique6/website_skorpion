"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLiveMessage } from "../hooks/useLiveMessage";
import { getLiveMessageContent } from "../services/livemessage.service";
import { LiveMessageForm } from "./LiveMessageForm";
import { LiveMessagePreview } from "./LiveMessagePreview";
import { LiveMessageCooldown } from "./LiveMessageCooldown";
import { LiveMessageSuccess } from "./LiveMessageSuccess";
import { LiveMessageInfoCard } from "./LiveMessageInfoCard";
import { EASE_OUT } from "@/lib/animation";

const content = getLiveMessageContent();

const ICON_BUTTON =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[#1A1A1A]/[0.12] text-[#1A1A1A]/40 transition-colors duration-200 hover:border-[#1A1A1A]/25 hover:text-[#1A1A1A]/70";

export const LiveMessageView = () => {
  const router = useRouter();
  const { state, submit, confirm, reset } = useLiveMessage();

  const onForm =
    state.status === "idle" || state.status === "validating" || state.status === "error";
  const errorMessage = state.error ? content.errors[state.error] : null;

  const handleBack = () => {
    if (onForm) {
      router.push("/");
      return;
    }
    reset();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="flex w-full items-center justify-between border-b border-[#1A1A1A]/[0.06] px-6 py-6 md:px-12 lg:px-16"
      >
        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={ICON_BUTTON}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
          <span className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]/30">
            Skorpion
          </span>
        </div>
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className={ICON_BUTTON}
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </motion.button>
      </motion.header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12 lg:py-16">
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
                  transition: { duration: 0.5, ease: EASE_OUT, delay: 0.15 },
                }}
                exit={{ opacity: 0, x: 24, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE_OUT } }}
                className="w-full lg:w-[360px] lg:flex-shrink-0"
              >
                <LiveMessageInfoCard content={content.info} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
