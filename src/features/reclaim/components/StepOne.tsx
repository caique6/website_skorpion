"use client";

import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";
import { StepWrapper } from "./StepWrapper";

interface Props {
  onNext: () => void;
}

const features = [
  "Acesso antecipado a vídeos e conteúdos exclusivos",
  "Participação em sessões de gameplay com o Skorpion",
  "Grupos VIP no Discord e WhatsApp",
  "Seu nome nos vídeos e no servidor GTA",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 280, damping: 26 } },
};

export const StepOne = ({ onNext }: Props) => {
  return (
    <StepWrapper>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-skorpion-red">
          <Users className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.25em]">
            Clube de Membros
          </span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
          BEM-VINDO À<br />BASE DO<br />SKORPION
        </h1>
        <p className="text-[#1A1A1A]/55 text-base lg:text-lg font-medium leading-relaxed max-w-lg">
          O clube de membros é o nosso espaço direto — onde a comunidade vai além do canal e entra de verdade no jogo.
        </p>
      </div>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-3"
          >
            <div className="mt-1 w-5 h-5 rounded-full bg-skorpion-red/10 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-skorpion-red" />
            </div>
            <span className="text-[#1A1A1A]/70 text-sm lg:text-base font-medium leading-relaxed">
              {feature}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="group relative self-start flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
      >
        <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        <span className="relative z-10">Vamos lá</span>
        <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
      </motion.button>
    </StepWrapper>
  );
};