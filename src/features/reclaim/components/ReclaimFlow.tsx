"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReclaim } from "../hooks/useReclaim";
import { StepIndicator } from "./StepIndicator";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";

export const ReclaimFlow = () => {
  const router = useRouter();
  const {
    state,
    goToStep,
    setIsMember,
    redeemCode,
    reset,
  } = useReclaim();

  const handleBack = () => {
    if (state.step === 1) {
      router.push("/");
      return;
    }
    goToStep((state.step - 1) as 1 | 2 | 3 | 4);
  };

  const handleConfirmMember = () => {
    setIsMember(true);
    goToStep(3);
  };

  const handleStartOver = () => {
    reset();
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="w-full flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 border-b border-[#1A1A1A]/06"
      >
        <div className="flex items-center gap-4">
          {state.step > 1 && state.step < 4 && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-full border border-[#1A1A1A]/12 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 hover:border-[#1A1A1A]/25 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </motion.button>
          )}
          <span className="font-black text-sm uppercase tracking-widest text-[#1A1A1A]/30">
            Skorpion
          </span>
        </div>

        <div className="flex items-center gap-6">
          <StepIndicator current={state.step} total={4} />
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-full border border-[#1A1A1A]/12 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 hover:border-[#1A1A1A]/25 transition-colors duration-200"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-12 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {state.step === 1 && (
            <StepOne key="step-1" onNext={() => goToStep(2)} />
          )}
          {state.step === 2 && (
            <StepTwo
              key="step-2"
              onConfirmMember={handleConfirmMember}
              onNotMember={() => {}}
            />
          )}
          {state.step === 3 && (
            <StepThree
              key="step-3"
              onRedeem={redeemCode}
              isLoading={state.isLoading}
              error={state.error}
              errorMessage={(state as { errorMessage?: string }).errorMessage}
            />
          )}
          {state.step === 4 && (
            <StepFour
              key="step-4"
              code={state.code}
              tier={state.tier}
              onStartOver={handleStartOver}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};