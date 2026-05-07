"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Plan } from "../types";
import { BenefitIcon } from "../utils/benefit-icon";

interface Props {
  plan: Plan;
}

export const PlanCardSkorpionzinho = ({ plan }: Props) => {
  return (
    <div
      data-plan-card
      className="relative rounded-[32px] overflow-hidden p-8 lg:p-10 flex flex-col gap-6"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-3xl lg:text-4xl font-black text-white/80 uppercase tracking-tight leading-none">
            {plan.name}
          </h3>

          <div
            className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <Star className="w-5 h-5 text-white/40" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-white/25">R$</span>
          <span className="text-5xl lg:text-6xl font-black text-white/80 leading-none tracking-tight">
            {plan.price.replace("R$", "").trim()}
          </span>
          <span className="text-white/25 text-sm font-medium self-end pb-1">{plan.billingCycle}</span>
        </div>

        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.10), transparent)" }}
        />

        <div className="flex flex-col gap-3">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-3">
              <div
                className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <BenefitIcon
                  name={benefit.icon}
                  className="w-3 h-3 text-white/40"
                />
              </div>
              <span className="text-white/50 text-sm font-medium leading-relaxed">
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
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.50)",
          }}
        >
          Assinar agora
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </div>
  );
};