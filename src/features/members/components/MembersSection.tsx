"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MembersData, Plan } from "../types";
import { useMembers } from "../hooks/useMembers";
import { PlanCardSkorpionario } from "./PlanCardSkorpionario";
import { PlanCardSkorpiao } from "./PlanCardSkorpiao";
import { PlanCardSkorpionzinho } from "./PlanCardSkorpionzinho";
import { SkorpionarioShowcase } from "./SkorpionarioShowcase";

interface Props {
  data: MembersData;
}

const TAB_COLOR: Record<
  string,
  { active: string; activeBg: string; activeBorder: string }
> = {
  skorpionario: {
    active: "#F2CE16",
    activeBg: "rgba(242,206,22,0.15)",
    activeBorder: "rgba(242,206,22,0.4)",
  },
  skorpiao: {
    active: "#FFFFFF",
    activeBg: "rgba(10,10,10,0.8)",
    activeBorder: "rgba(10,10,10,1)",
  },
  skorpionzinho: {
    active: "#FFFFFF",
    activeBg: "rgba(230,25,59,0.9)",
    activeBorder: "rgba(255,255,255,0.4)",
  },
};

function resolveCard(tier: string, plan: Plan) {
  if (tier === "skorpionario") return <PlanCardSkorpionario plan={plan} />;
  if (tier === "skorpiao") return <PlanCardSkorpiao plan={plan} />;
  return <PlanCardSkorpionzinho plan={plan} />;
}

export const MembersSection = ({ data }: Props) => {
  const plans = data.plans;
  const { activeIndex, goTo, goNext, goPrev, containerRef, cardHeight } =
    useMembers(plans.length);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const swipe =
      Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 300;
    if (swipe) {
      if (info.offset.x < 0 || info.velocity.x < -300) goNext();
      else goPrev();
    }
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
                  color: isActive ? tabStyle.active : "rgba(255,255,255,0.3)",
                  backgroundColor: isActive
                    ? tabStyle.activeBg
                    : "rgba(255,255,255,0.02)",
                  borderColor: isActive
                    ? tabStyle.activeBorder
                    : "rgba(255,255,255,0.08)",
                }}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        <motion.div
          ref={containerRef}
          className="relative w-full overflow-visible"
          style={{ minHeight: cardHeight ? `${cardHeight}px` : undefined }}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragEnd={isMobile ? handleDragEnd : undefined}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="w-full"
            >
              {resolveCard(plans[activeIndex].tier, plans[activeIndex])}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-2">
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
                    activeIndex === index
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
