"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntro } from "@/features/intro/context/IntroProvider";
import { HeroData } from "../types";
import { HeroActions } from "./HeroActions";
import { ShineText } from "./ShineText";

interface Props {
  data: HeroData;
}

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const subtitleClass =
  "max-w-xl text-base sm:text-lg font-medium leading-relaxed text-skorpion-black/60";

export const Hero = ({ data }: Props) => {
  const { complete } = useIntro();
  const [step, setStep] = useState(0);
  const isFinal = step >= data.intro.length;

  useEffect(() => {
    if (isFinal) {
      complete();
      return;
    }
    const timer = setTimeout(
      () => setStep((current) => current + 1),
      data.intro[step].durationMs,
    );
    return () => clearTimeout(timer);
  }, [step, isFinal, data.intro, complete]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-skorpion-white px-6">
      <AnimatePresence mode="wait">
        {isFinal ? (
          <motion.div
            key="final"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-black tracking-tight">
              {data.headline.map((segment) =>
                segment.emphasis ? (
                  <ShineText
                    key={segment.id}
                    text={segment.text}
                    className="text-skorpion-darkRed"
                  />
                ) : (
                  <span key={segment.id} className="text-skorpion-red">
                    {segment.text}{" "}
                  </span>
                ),
              )}
            </h1>

            <p className={`mt-6 ${subtitleClass}`}>{data.subtitle}</p>

            <div className="mt-10">
              <HeroActions actions={data.actions} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={data.intro[step].id}
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <p className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-skorpion-red">
              {data.intro[step].text}
            </p>
            {data.intro[step].subtext && (
              <p className={`mt-5 ${subtitleClass}`}>
                {data.intro[step].subtext}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
