"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { HeroData } from "../types";
import { YoutubeChannelMenu } from "./YoutubeChannelMenu";
import { VipButton } from "./VipButton";

interface Props {
  data: HeroData;
}

const fireVariants = {
  rest: { scale: 0, opacity: 0, filter: "blur(10px)" },
  hover: {
    scale: 1.8,
    opacity: 1,
    filter: "blur(25px)",
    transition: { type: "spring", stiffness: 320, damping: 26, mass: 0.9 },
  },
};

const fireLayer = "absolute inset-0 rounded-full mix-blend-screen -z-10";

export const Hero = ({ data }: Props) => {
  const [vipHovered, setVipHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 xl:gap-16 z-10 py-20 lg:py-0">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
          <h1 className="text-5xl sm:text-6xl lg:text-[5.33rem] leading-[1.05] font-black text-skorpion-white mb-6 tracking-tight uppercase drop-shadow-md">
            {data.title}
          </h1>

          <p className="text-lg sm:text-xl lg:text-[1.45rem] text-skorpion-white/90 mb-8 max-w-xl font-medium leading-relaxed drop-shadow-sm">
            {data.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-4 w-full max-w-xl mb-7"
          >
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 whitespace-nowrap shrink-0">
              Você é membro do canal?
            </span>
            <div className="h-px flex-1 bg-white/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="w-full sm:max-w-[620px]"
          >
            <LayoutGroup id="hero-btns">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                {data.actions.map((action) =>
                  action.channels ? (
                    <YoutubeChannelMenu
                      key={action.id}
                      action={action}
                      condensed={vipHovered}
                    />
                  ) : (
                    <VipButton
                      key={action.id}
                      action={action}
                      onHoverChange={setVipHovered}
                    />
                  ),
                )}
              </div>
            </LayoutGroup>
          </motion.div>
        </div>

        <div className="relative w-full flex justify-center lg:justify-end items-center lg:-translate-x-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover="hover"
            className="group relative w-full max-w-[320px] sm:max-w-[480px] md:max-w-[550px] lg:max-w-[1080px] aspect-square pointer-events-auto cursor-pointer"
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
              mass: 1.2,
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center -z-10"
              variants={{
                rest: {},
                hover: { transition: { staggerChildren: 0.05 } },
              }}
            >
              <motion.div
                variants={fireVariants}
                className={fireLayer}
                style={{
                  background:
                    "radial-gradient(circle, #BF2604 0%, transparent 70%)",
                }}
              />
              <motion.div
                variants={fireVariants}
                className={fireLayer}
                style={{
                  background:
                    "radial-gradient(circle, #F21B42 0%, transparent 60%)",
                }}
              />
              <motion.div
                variants={fireVariants}
                className={fireLayer}
                style={{
                  background:
                    "radial-gradient(circle, #F2CE16 0%, #D9183B 40%, transparent 65%)",
                }}
              />
            </motion.div>

            <motion.div
              className="w-full h-full"
              variants={{
                rest: { scale: 1 },
                hover: {
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                },
              }}
            >
              <Image
                src={data.heroImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1080px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
