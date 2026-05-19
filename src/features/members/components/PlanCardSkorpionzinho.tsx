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
            "radial-gradient(circle at 50% 0%, rgba(230,25,59,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
            {plan.name}
          </h3>

          <div
            className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(230,25,59,0.15)",
              border: "1px solid rgba(230,25,59,0.3)",
            }}
          >
            <Star className="w-5 h-5 text-[#E6193B]" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-[#E6193B]/60">R$</span>
          <span className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
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
              "linear-gradient(to right, rgba(230,25,59,0.40), transparent)",
          }}
        />

        <div className="flex flex-col gap-3">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-3">
              <div
                className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "rgba(230,25,59,0.10)",
                  borderColor: "rgba(230,25,59,0.25)",
                }}
              >
                <BenefitIcon
                  name={benefit.icon}
                  className="w-3 h-3 text-[#E6193B]"
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
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200"
          style={{
            background: "rgba(230,25,59,0.15)",
            border: "1px solid rgba(230,25,59,0.3)",
            color: "white",
          }}
        >
          Assinar agora
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </div>
  );
};
