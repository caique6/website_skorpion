"use client";

import { motion } from "framer-motion";
import { ExternalLink, Shield } from "lucide-react";
import { Plan } from "../types";
import { BenefitIcon } from "../utils/benefit-icon";

interface Props {
  plan: Plan;
}

export const PlanCardSkorpiao = ({ plan }: Props) => {
  return (
    <div
      data-plan-card
      className="relative rounded-[32px] overflow-hidden p-8 lg:p-10 flex flex-col gap-6"
      style={{
        background: "linear-gradient(145deg, rgba(40,40,40,0.95) 0%, rgba(10,10,10,0.98) 100%)",
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        border: "1px solid rgba(192,192,192,0.22)",
        boxShadow: "0 0 60px rgba(192,192,192,0.06), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, rgba(192,192,192,0.10) 0%, transparent 55%)",
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(192,192,192,0.35), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
              {plan.name}
            </h3>
          </div>

          <div
            className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(192,192,192,0.06)",
              border: "1px solid rgba(192,192,192,0.22)",
            }}
          >
            <Shield className="w-5 h-5 text-[#C0C0C0]" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-[#C0C0C0]/50">R$</span>
          <span className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
            {plan.price.replace("R$", "").trim()}
          </span>
          <span className="text-white/25 text-sm font-medium self-end pb-1">{plan.billingCycle}</span>
        </div>

        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(to right, rgba(192,192,192,0.25), rgba(192,192,192,0.08), transparent)",
          }}
        />

        <div className="flex flex-col gap-3">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-3">
              <div
                className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "rgba(192,192,192,0.06)",
                  borderColor: "rgba(192,192,192,0.22)",
                }}
              >
                <BenefitIcon
                  name={benefit.icon}
                  className="w-3 h-3 text-[#C0C0C0]"
                />
              </div>
              <span className="text-white/65 text-sm font-medium leading-relaxed">
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
            background: "linear-gradient(135deg, rgba(192,192,192,0.15) 0%, rgba(192,192,192,0.05) 100%)",
            border: "1px solid rgba(192,192,192,0.25)",
            color: "#C0C0C0",
          }}
        >
          Assinar agora
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </div>
  );
};