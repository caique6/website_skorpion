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
    <section className="relative w-full min-h-screen flex items-center justify-center py-10 lg:py-20 px-4 md:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        exit={{ opacity: 0, y: -120, scale: 0.95 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-full max-w-7xl h-[85vh] lg:h-auto lg:aspect-[16/9] relative z-10 flex flex-col rounded-[32px] lg:rounded-[40px] shadow-2xl"
      >
        <div className="absolute inset-0 bg-skorpion-black/30 backdrop-blur-3xl saturate-[0.80] rounded-[32px] lg:rounded-[40px]" />
        
        <div className="relative z-20 w-full h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col overflow-hidden">
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
        </div>
      </motion.div>
    </section>
  );
};