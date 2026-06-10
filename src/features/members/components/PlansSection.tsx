"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animation";
import { PlansSectionContent, PlanTier } from "../types";
import { PlanCard } from "./PlanCard";

interface Props {
  content: PlansSectionContent;
}

const TIER_ORDER: PlanTier[] = ["skorpionzinho", "skorpionario", "skorpiao"];

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const PlansSection = ({ content }: Props) => {
  const orderedPlans = [...content.plans].sort(
    (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier),
  );

  return (
    <section className="w-full bg-skorpion-red px-6 py-20 sm:py-28">
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="text-xs font-black uppercase tracking-[0.4em] text-skorpion-yellow">
          {content.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-skorpion-white sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 text-base font-medium leading-relaxed text-skorpion-white/70">
          {content.subtitle}
        </p>
      </motion.div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch"
      >
        {orderedPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </motion.div>
    </section>
  );
};
