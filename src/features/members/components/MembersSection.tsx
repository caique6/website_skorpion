"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MembersData } from "../types";
import { useMembers } from "../hooks/useMembers";
import { MembersIntroView } from "./MembersIntroView";
import { MembersPlansView } from "./MembersPlansView";

interface Props {
  data: MembersData;
}

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 60,
    filter: "blur(6px)",
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -60,
    filter: "blur(6px)",
    scale: 0.97,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  }),
};

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(48px)",
  WebkitBackdropFilter: "blur(48px)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const glowStyle = {
  background: "radial-gradient(ellipse at 20% 0%, rgba(230,25,59,0.10) 0%, transparent 55%)",
};

export const MembersSection = ({ data }: Props) => {
  const { showPlans, togglePlans } = useMembers();
  const direction = showPlans ? 1 : -1;

  return (
    <section className="relative w-full flex items-center justify-center py-16 lg:py-24 px-4 md:px-8">
      <div className="w-full max-w-6xl relative z-10">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {!showPlans ? (
            <motion.div
              key="intro"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative rounded-[40px] overflow-hidden p-8 sm:p-10 lg:p-14"
              style={cardStyle}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={glowStyle}
              />
              <div className="relative z-10">
                <MembersIntroView intro={data.intro} onAction={togglePlans} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="plans"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative rounded-[40px] overflow-hidden p-8 sm:p-10 lg:p-14"
              style={cardStyle}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={glowStyle}
              />
              <div className="relative z-10">
                <MembersPlansView plans={data.plans} onBack={togglePlans} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};