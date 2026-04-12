"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { StepWrapper } from "./StepWrapper";

interface Props {
  onGenerate: () => void;
}

const steps = [
  {
    number: "01",
    title: "Entre com o Google",
    description:
      "Use a conta Google vinculada ao seu canal do YouTube — a mesma que você usa para assinar o clube de membros do Skorpion.",
    highlight: true,
  },
  {
    number: "02",
    title: "Sincronização automática",
    description:
      "O sistema vai verificar automaticamente se sua assinatura está ativa e qual é o seu plano.",
    highlight: false,
  },
  {
    number: "03",
    title: "Gere seu código",
    description:
      "Com a conta verificada, clique no botão abaixo para gerar seu código único de resgate.",
    highlight: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 280, damping: 26 } },
};

export const StepThree = ({ onGenerate }: Props) => {
  return (
    <StepWrapper>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-skorpion-red">
          <Gift className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.25em]">
            Resgate
          </span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
          GARANTA SEU
          <br />
          BENEFÍCIO
        </h2>
        <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg">
          Para resgatar, basta entrar com a conta Google do seu canal. O processo é automático e leva menos de um minuto.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5"
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            className="flex items-start gap-5"
          >
            <span className="text-3xl lg:text-4xl font-black leading-none shrink-0 w-10 text-[#CCCCCC]">
              {step.number}
            </span>
            <div className="flex flex-col gap-1 pt-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm lg:text-base text-[#1A1A1A] uppercase tracking-tight">
                  {step.title}
                </h3>
                {step.highlight && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-skorpion-red/10 text-skorpion-red">
                    Importante
                  </span>
                )}
              </div>
              <p className="text-[#1A1A1A]/50 text-xs lg:text-sm font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 240, damping: 28 }}
      >
        <motion.button
          onClick={onGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        >
          <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          <FaGoogle className="relative z-10 w-4 h-4" />
          <span className="relative z-10">Entrar com Google</span>
        </motion.button>
      </motion.div>
    </StepWrapper>
  );
};