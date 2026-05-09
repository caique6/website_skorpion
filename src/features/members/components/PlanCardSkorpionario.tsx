"use client";

import { motion } from "framer-motion";
import { Crown, ExternalLink, Zap } from "lucide-react";
import { Plan } from "../types";
import { BenefitIcon } from "../utils/benefit-icon";

interface Props {
  plan: Plan;
}

const FLOATING = [
  { emoji: "👑", x: "8%", delay: 0, duration: 4.2 },
  { emoji: "⚡", x: "88%", delay: 1.1, duration: 3.8 },
  { emoji: "🔥", x: "50%", delay: 0.6, duration: 5.0 },
];

export const PlanCardSkorpionario = ({ plan }: Props) => {
  return (
    <div
      data-plan-card
      className="relative rounded-[32px] overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6"
      style={{
        background: "linear-gradient(135deg, rgba(242,206,22,0.10) 0%, rgba(0,0,0,0.60) 60%)",
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        border: "1px solid rgba(242,206,22,0.30)",
        boxShadow: "0 0 80px rgba(242,206,22,0.12), 0 32px 80px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% -10%, rgba(242,206,22,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none overflow-hidden">
        {FLOATING.map((item, i) => (
          <motion.span
            key={i}
            className="absolute text-lg select-none"
            style={{ left: item.x, top: "-10%" }}
            animate={{ y: ["0%", "500%"], opacity: [0, 0.5, 0.5, 0], rotate: [-8, 8, -4, 0] }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#F2CE16]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F2CE16]/70">
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
              background: "rgba(242,206,22,0.10)",
              border: "1px solid rgba(242,206,22,0.25)",
            }}
          >
            <Zap className="w-6 h-6 text-[#F2CE16]" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[#F2CE16]/50 text-base font-bold">R$</span>
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
            {plan.price.replace("R$", "").trim()}
          </span>
          <span className="text-white/30 text-sm font-medium self-end pb-1">{plan.billingCycle}</span>
        </div>

        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(to right, rgba(242,206,22,0.35), transparent)" }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plan.benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "rgba(242,206,22,0.08)",
                  borderColor: "rgba(242,206,22,0.25)",
                }}
              >
                <BenefitIcon
                  name={benefit.icon}
                  className="w-3 h-3"
                  style={{ color: "#F2CE16" }}
                />
              </div>
              <span className="text-white/75 text-sm font-medium leading-relaxed">
                {benefit.title}
              </span>
            </div>
          ))}
        </div>

        <motion.a
          href={plan.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(242,206,22,0.40)" }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-[#0A0A0A] transition-all duration-300"
          style={{
            backgroundColor: "#F2CE16",
            boxShadow: "0 8px 24px rgba(242,206,22,0.25)",
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