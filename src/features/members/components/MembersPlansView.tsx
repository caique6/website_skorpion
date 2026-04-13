"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, ChevronsRight } from "lucide-react";
import { Plan } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  plans: Plan[];
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 28 },
  },
};

const shimmerVariants = {
  initial: { x: "-120%", opacity: 0 },
  animate: {
    x: "220%",
    opacity: [0, 0.4, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatDelay: 5,
      ease: "easeInOut",
    },
  },
};

const borderVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

function HighlightedCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 280, damping: 26 },
      }}
      className="group relative flex flex-col shrink-0 lg:shrink w-[82vw] sm:w-[340px] lg:w-full snap-center rounded-[28px] lg:rounded-[32px] overflow-hidden cursor-pointer lg:scale-105"
      style={{
        background: "#111111",
        boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      <motion.div
        variants={borderVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 rounded-[28px] lg:rounded-[32px] pointer-events-none"
        style={{
          padding: "1.5px",
          background: "linear-gradient(135deg, #F2CE16 0%, #D4960A 40%, rgba(242,206,22,0.2) 70%, #F2CE16 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(242,206,22,0.2) 0%, transparent 60%)",
        }}
      />

      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(242,206,22,0.08), transparent)",
          transform: "skewX(-15deg)",
        }}
      />

      <div className="relative flex flex-col p-6 lg:p-8 w-full h-full">
        <div className="mb-5 lg:mb-6 text-center">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#F2CE16]/60 mb-2.5 bg-[#F2CE16]/10 border border-[#F2CE16]/20 px-3 py-1 rounded-full">
            Mais Popular
          </span>
          <h3 className="text-lg lg:text-xl font-black mb-3 uppercase tracking-tight text-white">
            {plan.name}
          </h3>
          <div className="flex items-baseline justify-center gap-1 text-white">
            <span className="text-base lg:text-lg font-bold opacity-50">R$</span>
            <span className="text-4xl lg:text-5xl font-black leading-none">
              {plan.price.replace("R$", "").trim()}
            </span>
            <span className="text-xs lg:text-sm font-bold ml-1 opacity-40">
              {plan.billingCycle}
            </span>
          </div>
        </div>

        <div className="w-full h-px mb-5 lg:mb-6"
          style={{ background: "rgba(242,206,22,0.15)" }}
        />

        <div className="flex-1 flex flex-col gap-3 mb-6 lg:mb-8">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-3 items-start">
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(242,206,22,0.12)", border: "1px solid rgba(242,206,22,0.25)" }}
              >
                <Check className="w-3 h-3" strokeWidth={3.5} style={{ color: "#F2CE16" }} />
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight mb-0.5 text-white">
                  {benefit.title}
                </h4>
                <p className="text-xs font-medium leading-relaxed text-white/50">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ backgroundColor: "#F2CE16", color: "#111111" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="w-full py-3.5 lg:py-4 rounded-2xl font-black text-sm tracking-wider uppercase mt-auto border text-[#F2CE16] transition-colors duration-200"
          style={{
            backgroundColor: "rgba(242,206,22,0.08)",
            borderColor: "rgba(242,206,22,0.25)",
          }}
        >
          Ser um Skorpionário
        </motion.button>
      </div>
    </motion.div>
  );
}

function RegularCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 280, damping: 28 },
      }}
      className="group relative flex flex-col shrink-0 lg:shrink w-[82vw] sm:w-[340px] lg:w-full snap-center rounded-[28px] lg:rounded-[32px] overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative flex flex-col p-6 lg:p-8 w-full h-full">
        <div className="mb-5 lg:mb-6 text-center">
          <h3 className="text-lg lg:text-xl font-black mb-3 uppercase tracking-tight text-skorpion-white">
            {plan.name}
          </h3>
          <div className="flex items-baseline justify-center gap-1 text-skorpion-white">
            <span className="text-base lg:text-lg font-bold opacity-50">R$</span>
            <span className="text-4xl lg:text-5xl font-black leading-none">
              {plan.price.replace("R$", "").trim()}
            </span>
            <span className="text-xs lg:text-sm font-bold ml-1 opacity-35">
              {plan.billingCycle}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-5 lg:mb-6" />

        <div className="flex-1 flex flex-col gap-3 mb-6 lg:mb-8">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-3 items-start">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-skorpion-white" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight mb-0.5 text-skorpion-white">
                  {benefit.title}
                </h4>
                <p className="text-xs font-medium leading-relaxed text-skorpion-white/50">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ backgroundColor: "rgba(255,255,255,0.14)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="w-full py-3.5 lg:py-4 rounded-2xl font-black text-sm tracking-wider uppercase mt-auto bg-white/[0.08] text-skorpion-white border border-white/10"
        >
          {`Escolher ${plan.name}`}
        </motion.button>
      </div>
    </motion.div>
  );
}

export const MembersPlansView = ({ plans, onBack }: Props) => {
  const orderedPlans = [...plans].sort((a, b) => {
    const order: Record<number, number> = { 1: 0, 3: 1, 2: 2 };
    return order[a.tier] - order[b.tier];
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
      className="relative w-full h-full flex flex-col justify-center"
    >
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.18)" }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="absolute top-0 left-0 lg:-top-4 lg:-left-4 z-50 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 flex items-center justify-center text-skorpion-white border border-white/10 backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
      </motion.button>

      <div className="absolute top-0 right-0 z-50 flex lg:hidden items-center gap-1.5 text-skorpion-white/40 bg-white/5 px-3 py-1.5 rounded-full">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] font-black uppercase tracking-[0.2em]"
        >
          Deslize
        </motion.span>
        <ChevronsRight className="w-3.5 h-3.5" />
      </div>

      <div className="w-full pt-10 lg:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "flex lg:grid lg:grid-cols-3 lg:items-center",
            "gap-4 lg:gap-5 xl:gap-6",
            "w-full max-w-5xl mx-auto",
            "overflow-x-auto lg:overflow-visible",
            "snap-x snap-mandatory",
            "px-4 lg:px-6 pb-8 lg:pb-0",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
        >
          {orderedPlans.map((plan) =>
            plan.highlighted ? (
              <HighlightedCard key={plan.id} plan={plan} />
            ) : (
              <RegularCard key={plan.id} plan={plan} />
            )
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};