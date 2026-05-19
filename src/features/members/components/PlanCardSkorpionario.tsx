"use client";

import { motion } from "framer-motion";
import { Crown, ExternalLink, Zap } from "lucide-react";
import { Plan } from "../types";
import { BenefitIcon } from "../utils/benefit-icon";

interface Props {
  plan: Plan;
}

export const PlanCardSkorpionario = ({ plan }: Props) => {
  return (
    <div
      data-plan-card
      className="relative rounded-[32px] overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6"
      style={{
        backgroundColor: "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(40px) saturate(150%)",
        WebkitBackdropFilter: "blur(40px) saturate(150%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow:
          "0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(242,206,22,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#F2CE16]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F2CE16]/80">
                Nível máximo
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
              {plan.name}
            </h3>
          </div>

          <div
            className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(242,206,22,0.15)",
              border: "1px solid rgba(242,206,22,0.30)",
            }}
          >
            <Zap className="w-6 h-6 text-[#F2CE16]" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[#F2CE16]/60 text-base font-bold">R$</span>
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
            {plan.price.replace("R$", "").trim()}
          </span>
          <span className="text-white/40 text-sm font-medium self-end pb-1">
            {plan.billingCycle}
          </span>
        </div>

        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(242,206,22,0.40), transparent)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "rgba(242,206,22,0.10)",
                  border: "1px solid rgba(242,206,22,0.25)",
                }}
              >
                <BenefitIcon
                  name={benefit.icon}
                  className="w-3 h-3 text-[#F2CE16]"
                />
              </div>
              <span className="text-white/80 text-sm font-medium leading-relaxed">
                {benefit.title}
              </span>
            </div>
          ))}
        </div>

        <motion.a
          href={plan.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-[#1A1A1A] transition-all duration-300"
          style={{
            backgroundColor: "#F2CE16",
            boxShadow: "0 8px 24px rgba(242,206,22,0.3)",
          }}
        >
          <Crown className="w-4 h-4" />
          Assinar agora
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </div>
  );
};
