"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, Crown, Zap, Star } from "lucide-react";
import { Plan } from "../types";

interface Props {
  plans: Plan[];
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
};

const TIER_ICON: Record<number, React.ElementType> = {
  1: Star,
  2: Zap,
  3: Crown,
};

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = TIER_ICON[plan.tier] ?? Star;
  const isHighlighted = plan.highlighted;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 320, damping: 26 },
      }}
      className="relative flex flex-col rounded-[24px] overflow-hidden cursor-pointer"
      style={
        isHighlighted
          ? {
              background: "rgba(8,8,8,0.90)",
              backdropFilter: "blur(48px)",
              WebkitBackdropFilter: "blur(48px)",
              border: "1px solid rgba(242,206,22,0.25)",
              boxShadow: "0 0 0 1px rgba(242,206,22,0.08), 0 24px 48px rgba(0,0,0,0.5)",
            }
          : {
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }
      }
    >
      {isHighlighted && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% -20%, rgba(242,206,22,0.14) 0%, transparent 60%)",
          }}
        />
      )}

      <div className="relative flex flex-col p-6 gap-5 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            {isHighlighted && (
              <span
                className="text-[9px] font-black uppercase tracking-[0.3em] mb-0.5"
                style={{ color: "rgba(242,206,22,0.60)" }}
              >
                Recomendado
              </span>
            )}
            <h3
              className="text-lg font-black uppercase tracking-tight leading-none"
              style={{ color: isHighlighted ? "#FFFFFF" : "rgba(255,255,255,0.60)" }}
            >
              {plan.name}
            </h3>
          </div>

          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={
              isHighlighted
                ? {
                    background: "rgba(242,206,22,0.10)",
                    border: "1px solid rgba(242,206,22,0.20)",
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }
            }
          >
            <Icon
              className="w-4 h-4"
              strokeWidth={2}
              style={{ color: isHighlighted ? "#F2CE16" : "rgba(255,255,255,0.25)" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-1">
            <span
              className="text-sm font-bold"
              style={{ color: isHighlighted ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.18)" }}
            >
              R$
            </span>
            <span
              className="text-5xl font-black leading-none tracking-tight"
              style={{ color: isHighlighted ? "#FFFFFF" : "rgba(255,255,255,0.55)" }}
            >
              {plan.price.replace("R$", "").trim()}
            </span>
          </div>
          <span
            className="text-[11px] font-medium"
            style={{ color: isHighlighted ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.15)" }}
          >
            {plan.billingCycle}
          </span>
        </div>

        <div
          className="w-full h-px"
          style={{
            background: isHighlighted
              ? "linear-gradient(to right, rgba(242,206,22,0.25), transparent)"
              : "rgba(255,255,255,0.05)",
          }}
        />

        <div className="flex flex-col gap-2.5 flex-1">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-2.5 items-start">
              <div
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={
                  isHighlighted
                    ? {
                        background: "rgba(242,206,22,0.12)",
                        border: "1px solid rgba(242,206,22,0.22)",
                      }
                    : {
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                <Check
                  className="w-2.5 h-2.5"
                  strokeWidth={3}
                  style={{ color: isHighlighted ? "#F2CE16" : "rgba(255,255,255,0.25)" }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-bold text-xs leading-tight"
                  style={{ color: isHighlighted ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}
                >
                  {benefit.title}
                </span>
                <span
                  className="text-[11px] font-medium leading-relaxed"
                  style={{ color: isHighlighted ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.22)" }}
                >
                  {benefit.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-xl font-black text-xs tracking-wider uppercase mt-auto transition-opacity duration-200"
          style={
            isHighlighted
              ? { backgroundColor: "#F2CE16", color: "#0A0A0A" }
              : {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.30)",
                }
          }
        >
          {isHighlighted ? "Ser um Skorpionário" : `Escolher ${plan.name}`}
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
      key="plans-view"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="w-full flex flex-col gap-8"
    >
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -2, transition: { type: "spring", stiffness: 400, damping: 22 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-xs font-black uppercase tracking-widest">Voltar</span>
        </motion.button>

        <div className="flex flex-col items-end gap-0.5">
          <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.35em]">
            Clube de Membros
          </span>
          <span className="text-white/70 font-black text-sm uppercase tracking-tight">
            Escolha seu plano
          </span>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4"
      >
        {orderedPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </motion.div>
    </motion.div>
  );
};