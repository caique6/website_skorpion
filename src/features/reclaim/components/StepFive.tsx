"use client";

import { motion } from "framer-motion";
import { MessageSquare, HelpCircle, RotateCcw } from "lucide-react";
import { StepWrapper } from "./StepWrapper";

interface Props {
  onNext: () => void;
  onStartOver: () => void;
}

const DISCORD_INVITE_URL = "https://discord.gg/A9DsDhcJTM";

const instructions = [
  {
    number: "01",
    title: "Entre no servidor",
    description:
      "Clique no botão abaixo para entrar no servidor oficial Família - Skorpion Gamer.",
  },
  {
    number: "02",
    title: "Identifique-se",
    description:
      "Complete a verificação inicial do servidor para liberar o acesso completo aos canais.",
  },
  {
    number: "03",
    title: "Abra seu Ticket",
    description:
      "Vá para o canal #sou-membro e abra um ticket enviando o código que você copiou anteriormente.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
};

export const StepFive = ({ onNext, onStartOver }: Props) => {
  return (
    <StepWrapper>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#5865F2]">
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.25em]">
            Discord
          </span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
          PASSO A PASSO
          <br />
          NO DISCORD
        </h2>
        <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg">
          Siga as diretrizes abaixo para validar sua assinatura e receber seus
          cargos dentro da nossa comunidade.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5"
      >
        {instructions.map((step) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            className="flex items-start gap-5"
          >
            <span className="text-3xl lg:text-4xl font-black leading-none shrink-0 w-10 text-[#CCCCCC]">
              {step.number}
            </span>
            <div className="flex flex-col gap-1.5 pt-1 flex-1">
              <h3 className="font-black text-sm lg:text-base text-[#1A1A1A] uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-[#1A1A1A]/50 text-xs lg:text-sm font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-4 w-full">
        <motion.a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="group relative self-start flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden text-white shadow-[0_8px_24px_rgba(88,101,242,0.3)]"
          style={{ backgroundColor: "#5865F2" }}
        >
          <div className="absolute inset-0 bg-[#4752C4] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          <span className="relative z-10">Família - Skorpion Gamer</span>
        </motion.a>

        <div className="flex items-start gap-3 p-4 rounded-[16px] bg-[#1A1A1A]/[0.03] border border-[#1A1A1A]/08">
          <HelpCircle className="w-4 h-4 text-[#5865F2] shrink-0 mt-0.5" />
          <p className="text-[#1A1A1A]/55 text-xs lg:text-sm font-medium leading-relaxed">
            Após a abertura do ticket, nossa equipe validará o código enviado e
            atribuirá os privilégios à sua conta do Discord.
          </p>
        </div>

        <motion.button
          onClick={onStartOver}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors duration-200 text-xs font-black uppercase tracking-widest w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Recomeçar
        </motion.button>
      </div>
    </StepWrapper>
  );
};
