"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HeroData } from "../types";
import { cn } from "@/lib/utils";

interface HeroProps {
  data: HeroData;
}

const fireVariants = {
  rest: { 
    scale: 0, 
    opacity: 0,
    filter: "blur(10px)"
  },
  hover: { 
    scale: 1.8, 
    opacity: 1,
    filter: "blur(25px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      mass: 0.8
    }
  }
};

const fireLayerClasses = "absolute inset-0 rounded-full mix-blend-screen -z-10";

export const Hero = ({ data }: HeroProps) => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 xl:gap-16 z-10 py-20 lg:py-0">
        
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
          <h1 className="text-5xl sm:text-6xl lg:text-[5.33rem] xl:text-[5.33rem] leading-[1.05] font-black text-skorpion-white mb-6 tracking-tight uppercase drop-shadow-md">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-[1.45rem] xl:text-[1.45rem] text-skorpion-white/90 mb-10 max-w-xl font-medium leading-relaxed drop-shadow-sm">
            {data.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            {data.actions.map((action) => (
              <motion.a
                key={action.id}
                href={action.url}
                target={action.url.startsWith("http") ? "_blank" : undefined}
                rel={action.url.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-base tracking-wide transition-all duration-300 uppercase overflow-hidden",
                  action.variant === "primary"
                    ? "bg-gradient-to-r from-skorpion-red to-[#ff3b3b] text-skorpion-white shadow-[0_8px_20px_rgba(242,27,66,0.4)] hover:shadow-[0_12px_30px_rgba(242,27,66,0.6)]"
                    : "bg-skorpion-white/10 text-skorpion-white backdrop-blur-3xl saturate-[0.80] border border-skorpion-white/5 hover:bg-skorpion-white/20 hover:border-skorpion-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                )}
              >
                {action.variant === "primary" && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                )}
                <span className="relative z-10">{action.label}</span>
                <ChevronRight 
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  strokeWidth={2.5} 
                />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative w-full flex justify-center lg:justify-end items-center lg:-translate-x-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover="hover"
            className="group relative w-full max-w-[320px] sm:max-w-[480px] md:max-w-[550px] lg:max-w-[1080px] aspect-square pointer-events-auto cursor-pointer"
            transition={{ type: "spring", stiffness: 220, damping: 22, mass: 1.2 }}
          >
            <motion.div 
              className="absolute inset-0 flex items-center justify-center -z-10"
              variants={{
                rest: {},
                hover: {
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              <motion.div 
                variants={fireVariants}
                className={fireLayerClasses}
                style={{ background: "radial-gradient(circle, #BF2604 0%, transparent 70%)" }}
              />
              <motion.div 
                variants={fireVariants}
                className={fireLayerClasses}
                style={{ background: "radial-gradient(circle, #F21B42 0%, transparent 60%)" }}
              />
              <motion.div 
                variants={fireVariants}
                className={fireLayerClasses}
                style={{ background: "radial-gradient(circle, #F2CE16 0%, #D9183B 40%, transparent 65%)" }}
              />
            </motion.div>
            
            <motion.div
              className="w-full h-full"
              variants={{
                rest: { scale: 1 },
                hover: { 
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }
              }}
            >
              <Image
                src={data.heroImage}
                alt=""
                fill
                priority
                sizes="(max-w-1024px) 100vw, 1080px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};