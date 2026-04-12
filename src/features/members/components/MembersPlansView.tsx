"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, ChevronsRight } from "lucide-react";
import { Plan } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  plans: Plan[];
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export const MembersPlansView = ({ plans, onBack }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full h-full flex flex-col justify-center overflow-visible"
    >
      {/* Botão Voltar - Sobreposto */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-0 left-0 lg:-top-4 lg:-left-4 z-50 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-skorpion-white/10 hover:bg-skorpion-white/20 flex items-center justify-center text-skorpion-white backdrop-blur-md transition-colors"
      >
        <ArrowLeft className="w-5 h-5 lg:w-7 lg:h-7" strokeWidth={3} />
      </motion.button>

      {/* Indicador Mobile */}
      <div className="absolute top-0 right-0 z-50 flex lg:hidden items-center gap-1.5 text-skorpion-white/40 animate-pulse bg-skorpion-white/5 px-4 py-1.5 rounded-full">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deslize</span>
        <ChevronsRight className="w-4 h-4" />
      </div>

      <div className="w-full flex items-center justify-center overflow-visible pt-10 lg:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-10 w-full max-w-6xl mx-auto overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar items-center px-4 lg:px-8 pb-10 lg:pb-0"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ 
                scale: plan.highlighted ? 1.12 : 1.05, 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              className={cn(
                "group relative flex flex-col shrink-0 lg:shrink w-[82vw] sm:w-[340px] lg:w-full snap-center z-10 rounded-[32px] lg:rounded-[40px] transition-all duration-300",
                plan.highlighted 
                  ? "z-30 lg:scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.4)]" 
                  : "bg-skorpion-white/10 backdrop-blur-xl z-10"
              )}
            >
              {plan.highlighted && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-[32px] lg:rounded-[40px] bg-gradient-to-br from-[#F2CE16] via-[#F2BD1D] to-[#BF2604]"
                  style={{ backgroundSize: "200% 200%" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              )}

              <div className="relative flex flex-col p-7 lg:p-10 w-full h-full">
                <div className="mb-6 lg:mb-10 text-center">
                  <h3 className={cn(
                    "text-xl lg:text-2xl font-black mb-3 uppercase tracking-tight",
                    plan.highlighted ? "text-[#1A1A1A]" : "text-skorpion-white"
                  )}>
                    {plan.name}
                  </h3>
                  {/* Preço em uma linha com R$ menor */}
                  <div className={cn(
                    "flex items-baseline justify-center gap-1 whitespace-nowrap",
                    plan.highlighted ? "text-[#1A1A1A]" : "text-skorpion-white"
                  )}>
                    <span className="text-lg lg:text-2xl font-bold">R$</span>
                    <span className="text-4xl lg:text-5xl font-black">{plan.price.replace('R$', '').trim()}</span>
                    <span className={cn(
                      "font-bold text-xs lg:text-sm ml-1",
                      plan.highlighted ? "opacity-70" : "opacity-50"
                    )}>
                      {plan.billingCycle}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4 lg:gap-6 mb-8 lg:mb-12">
                  {plan.benefits.map((benefit) => (
                    <div key={benefit.id} className="flex gap-3 lg:gap-4 items-start">
                      <div className={cn(
                        "mt-1 rounded-full p-1 lg:p-1.5 shrink-0",
                        plan.highlighted ? "bg-[#1A1A1A]/10" : "bg-skorpion-white/10"
                      )}>
                        <Check className={cn("w-3.5 h-3.5 lg:w-4 lg:h-4", plan.highlighted ? "text-[#1A1A1A]" : "text-skorpion-white")} strokeWidth={4} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className={cn("font-bold text-sm lg:text-base leading-tight mb-0.5", plan.highlighted ? "text-[#1A1A1A]" : "text-skorpion-white")}>
                          {benefit.title}
                        </h4>
                        <p className={cn("text-xs lg:text-sm font-medium leading-relaxed", plan.highlighted ? "text-[#1A1A1A]/80" : "text-skorpion-white/70")}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-4 lg:py-5 rounded-2xl font-black text-sm lg:text-base tracking-wider transition-all duration-300 uppercase mt-auto",
                    plan.highlighted
                      ? "bg-[#1A1A1A] text-[#F2CE16] shadow-xl hover:bg-black"
                      : "bg-skorpion-white/10 text-skorpion-white hover:bg-skorpion-white/20"
                  )}
                >
                  {plan.highlighted ? "Ser um Skorpinário" : `Escolher ${plan.name}`}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};