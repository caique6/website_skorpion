"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MembersData } from "../types";
import { useMembers } from "../hooks/useMembers";
import { PlanCardSkorpionario } from "./PlanCardSkorpionario";
import { PlanCardSkorpiao } from "./PlanCardSkorpiao";
import { PlanCardSkorpionzinho } from "./PlanCardSkorpionzinho";
import { SkorpionarioShowcase } from "./SkorpionarioShowcase";

interface Props {
  data: MembersData;
}

const TAB_COLOR: Record<string, { active: string; activeBg: string; activeBorder: string }> = {
  skorpionario: {
    active: "#F2CE16",
    activeBg: "rgba(242,206,22,0.08)",
    activeBorder: "rgba(242,206,22,0.25)",
  },
  skorpiao: {
    active: "#C0C0C0",
    activeBg: "rgba(192,192,192,0.06)",
    activeBorder: "rgba(192,192,192,0.22)",
  },
  skorpionzinho: {
    active: "rgba(255,255,255,0.65)",
    activeBg: "rgba(255,255,255,0.04)",
    activeBorder: "rgba(255,255,255,0.12)",
  },
};

function resolveCard(tier: string, plan: Parameters<typeof PlanCardSkorpionario>[0]["plan"]) {
  if (tier === "skorpionario") return <PlanCardSkorpionario plan={plan} />;
  if (tier === "skorpiao") return <PlanCardSkorpiao plan={plan} />;
  return <PlanCardSkorpionzinho plan={plan} />;
}

export const MembersSection = ({ data }: Props) => {
  const plans = data.plans;
  const { activeIndex, goTo, goNext, goPrev, containerRef, cardHeight } = useMembers(plans.length);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const activePlan = plans[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="members"
      className="relative w-full flex flex-col items-center justify-center py-16 lg:py-24 px-4 md:px-8 gap-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="w-full max-w-2xl flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2 text-center">
          <span className="text-white/30 font-black text-[10px] tracking-[0.35em] uppercase">
            Clube de Membros
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.02]">
            ESCOLHA SEU PLANO
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {plans.map((plan, index) => {
            const tabStyle = TAB_COLOR[plan.tier] ?? TAB_COLOR["skorpionzinho"];
            const isActive = activeIndex === index;
            return (
              <button
                key={plan.id}
                onClick={() => goTo(index)}
                className="px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest border transition-all duration-300"
                style={{
                  color: isActive ? tabStyle.active : "rgba(255,255,255,0.25)",
                  backgroundColor: isActive ? tabStyle.activeBg : "transparent",
                  borderColor: isActive ? tabStyle.activeBorder : "rgba(255,255,255,0.08)",
                }}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            style={{ minHeight: cardHeight ? `${cardHeight}px` : undefined }}
            className="transition-[min-height] duration-300 ease-in-out"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan.id}
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) goNext();
                  if (info.offset.x > 60) goPrev();
                }}
              >
                {resolveCard(activePlan.tier, activePlan)}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => goPrev()}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white/50 hover:text-white z-20"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button
            onClick={() => goNext()}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white/50 hover:text-white z-20"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          {plans.map((plan, index) => {
            const tabStyle = TAB_COLOR[plan.tier] ?? TAB_COLOR["skorpionzinho"];
            return (
              <button
                key={index}
                onClick={() => goTo(index)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? 28 : 8,
                  height: 8,
                  backgroundColor: activeIndex === index
                    ? tabStyle.active
                    : "rgba(255,255,255,0.15)",
                }}
              />
            );
          })}
        </div>
      </motion.div>

      <SkorpionarioShowcase members={data.skorpionarios} />
    </section>
  );
};