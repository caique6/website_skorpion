"use client";

import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, Zap } from "lucide-react";
import { StepWrapper } from "./StepWrapper";

interface Props {
  onConfirmMember: () => void;
  onNotMember: () => void;
}

const plans = [
  {
    name: "Skorpionzinho",
    color: "#6B7280",
    description: "Acesso antecipado, selos exclusivos e prioridade nos comentários.",
  },
  {
    name: "Skorpião",
    color: "#E6193B",
    description: "Tudo do tier anterior mais vídeos exclusivos, shorts e grupos VIP.",
  },
  {
    name: "Skorpionário",
    color: "#F2CE16",
    description: "Acesso total — jogue e grave com o Skorpion, resenha direta e painel no GTA.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
};

export const StepTwo = ({ onConfirmMember, onNotMember }: Props) => {
  return (
    <StepWrapper>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-skorpion-red">
          <Zap className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.25em]">
            Benefícios
          </span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
          TRÊS NÍVEIS,<br />UM CLUBE
        </h2>
        <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg">
          Cada plano libera um nível diferente de acesso. Quanto mais alto o tier, mais perto você chega do Skorpion.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            className="flex flex-col gap-2 p-5 rounded-[20px] border border-[#1A1A1A]/08 bg-[#1A1A1A]/[0.03]"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: plan.color }}
            />
            <h3 className="font-black text-sm text-[#1A1A1A] uppercase tracking-tight">
              {plan.name}
            </h3>
            <p className="text-[#1A1A1A]/50 text-xs font-medium leading-relaxed">
              {plan.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-3">
        <p className="text-[#1A1A1A]/60 text-sm font-bold uppercase tracking-widest">
          Você já é membro do canal?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={onConfirmMember}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white"
          >
            <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            <span className="relative z-10">Sim, sou membro</span>
            <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
          </motion.button>

          <motion.a
            onClick={onNotMember}
            href="https://www.youtube.com/@SkorpionOFICIAL"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase border border-[#1A1A1A]/15 text-[#1A1A1A]/50 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]/70 transition-colors duration-300"
          >
            <span>Quero ser membro</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </StepWrapper>
  );
};