"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MembersData } from "../types";
import { useMembers } from "../hooks/useMembers";
import { MembersIntroView } from "./MembersIntroView";
import { MembersPlansView } from "./MembersPlansView";

interface Props {
  data: MembersData;
}

export const MembersSection = ({ data }: Props) => {
  const { showPlans, togglePlans } = useMembers();

  return (
    <section className="relative w-full flex items-center justify-center py-16 lg:py-24 px-4 md:px-8">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 32, mass: 1.1 }}
        className="w-full max-w-6xl relative z-10 rounded-[40px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(48px)",
          WebkitBackdropFilter: "blur(48px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 20% 0%, rgba(230,25,59,0.10) 0%, transparent 55%)",
          }}
        />

        <motion.div layout className="relative z-10 p-8 sm:p-10 lg:p-14">
          <AnimatePresence mode="wait">
            {!showPlans ? (
              <MembersIntroView
                key="intro"
                intro={data.intro}
                onAction={togglePlans}
              />
            ) : (
              <MembersPlansView
                key="plans"
                plans={data.plans}
                onBack={togglePlans}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};