"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animation";
import { Plan, PlanTier } from "../types";
import { BenefitIcon } from "../utils/benefit-icon";

interface Props {
  plan: Plan;
}

interface CardStyle {
  card: string;
  name: string;
  price: string;
  billing: string;
  iconWrap: string;
  benefit: string;
  cta: string;
  shine: boolean;
}

const STYLES: Record<PlanTier, CardStyle> = {
  skorpionzinho: {
    card: "bg-gradient-to-br from-skorpion-white to-gray-100 ring-1 ring-gray-200 shadow-[0_18px_50px_rgba(26,26,26,0.16)]",
    name: "text-gray-400",
    price: "text-gray-400",
    billing: "text-gray-400",
    iconWrap: "bg-gray-200 text-gray-500",
    benefit: "text-gray-600",
    cta: "bg-gray-400 text-skorpion-white hover:bg-gray-500",
    shine: false,
  },
  skorpiao: {
    card: "bg-gradient-to-br from-skorpion-red/80 to-skorpion-darkRed/80 backdrop-blur-xl ring-2 ring-skorpion-white/40 shadow-[0_22px_60px_rgba(26,26,26,0.35),inset_0_1px_0_rgba(255,255,255,0.30)]",
    name: "text-skorpion-white",
    price: "text-skorpion-white",
    billing: "text-skorpion-white/60",
    iconWrap: "bg-skorpion-white/15 text-skorpion-white",
    benefit: "text-skorpion-white/85",
    cta: "bg-skorpion-white text-skorpion-darkRed hover:bg-skorpion-yellow hover:text-skorpion-black",
    shine: false,
  },
  skorpionario: {
    card: "bg-gradient-to-br from-skorpion-yellow to-skorpion-darkYellow ring-2 ring-skorpion-black/15 shadow-[0_30px_70px_rgba(242,206,22,0.45)]",
    name: "text-skorpion-black",
    price: "text-skorpion-black",
    billing: "text-skorpion-black/50",
    iconWrap: "bg-skorpion-black/10 text-skorpion-black",
    benefit: "text-skorpion-black/80",
    cta: "bg-skorpion-black text-skorpion-yellow hover:bg-skorpion-black/85",
    shine: true,
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const PlanCard = ({ plan }: Props) => {
  const style = STYLES[plan.tier];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={`relative flex flex-col rounded-3xl p-8 ${style.card}`}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-skorpion-black px-4 py-1 text-[10px] font-black uppercase tracking-widest text-skorpion-yellow">
          Mais completo
        </span>
      )}

      {style.shine && <span aria-hidden className="card-shine" />}

      <div className="relative z-10 flex flex-1 flex-col">
        <h3 className={`text-xl font-black uppercase tracking-tight ${style.name}`}>
          {plan.name}
        </h3>

        <div className="mt-4 flex items-end gap-1.5">
          <span className={`pb-1.5 text-xl font-black ${style.price}`}>
            {plan.currency}
          </span>
          <span
            className={`text-6xl font-black leading-none tracking-tight ${style.price}`}
          >
            {plan.price}
          </span>
          <span className={`pb-1.5 text-sm font-bold ${style.billing}`}>
            {plan.billingCycle}
          </span>
        </div>

        <ul className="mt-8 flex flex-1 flex-col gap-4">
          {plan.benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${style.iconWrap}`}
              >
                <BenefitIcon name={benefit.icon} className="h-3.5 w-3.5" />
              </span>
              <span className={`text-sm font-medium leading-snug ${style.benefit}`}>
                {benefit.title}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={plan.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className={`mt-8 flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-black uppercase tracking-widest transition-colors ${style.cta}`}
        >
          Seja {plan.name}
        </a>
      </div>
    </motion.div>
  );
};
