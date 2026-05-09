"use client";

import { useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
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

const SPRING = { type: "spring", stiffness: 340, damping: 32, mass: 0.85 } as const;

function resolveCard(tier: string, plan: Parameters<typeof PlanCardSkorpionario>[0]["plan"]) {
  if (tier === "skorpionario") return <PlanCardSkorpionario plan={plan} />;
  if (tier === "skorpiao") return <PlanCardSkorpiao plan={plan} />;
  return <PlanCardSkorpionzinho plan={plan} />;
}

function slideOffset(rawOffset: number, total: number): number {
  if (rawOffset > Math.floor(total / 2)) return rawOffset - total;
  if (rawOffset < -Math.floor(total / 2)) return rawOffset + total;
  return rawOffset;
}

export const MembersSection = ({ data }: Props) => {
  const plans = data.plans;
  const { activeIndex, goTo, goNext, goPrev, containerRef, cardHeight } = useMembers(plans.length);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-180, 0, 180], [0, 1, 0]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 400;

    if (swipe) {
      if (info.offset.x < 0 || info.velocity.x < -400) goNext();
      else goPrev();
    }

    animate(dragX, 0, SPRING);
  };

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

        <div
          ref={containerRef}
          className="relative transition-[min-height] duration-300 ease-in-out"
          style={{ minHeight: cardHeight ? `${cardHeight}px` : undefined }}
        >
          {plans.map((plan, index) => {
            const raw = index - activeIndex;
            const offset = slideOffset(raw, plans.length);
            const isActive = offset === 0;
            const xPercent = offset * 130;

            return (
              <motion.div
                key={plan.id}
                initial={false}
                animate={{
                  x: isActive ? "0%" : `${xPercent}%`,
                  opacity: isActive ? 1 : 0,
                }}
                transition={SPRING}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDrag={isActive ? (_, info) => dragX.set(info.offset.x) : undefined}
                onDragEnd={isActive ? handleDragEnd : undefined}
                style={{
                  position: isActive ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  visibility: isActive ? "visible" : "hidden",
                  cursor: isActive ? "grab" : "default",
                  userSelect: "none",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <motion.div style={{ opacity: isActive ? dragOpacity : 1 }}>
                  {resolveCard(plan.tier, plan)}
                </motion.div>
              </motion.div>
            );
          })}
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
                  backgroundColor:
                    activeIndex === index ? tabStyle.active : "rgba(255,255,255,0.15)",
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
