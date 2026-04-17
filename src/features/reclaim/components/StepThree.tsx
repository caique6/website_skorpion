"use client";

import { motion } from "framer-motion";
import { Gift, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { StepWrapper } from "./StepWrapper";
import { ReclaimError } from "../types";

interface Props {
  onRedeem: (channelId: string) => void;
  isLoading: boolean;
  error: ReclaimError | null;
  errorMessage?: string | null;
}

const ERROR_MESSAGES: Record<ReclaimError, string> = {
  member_not_found: "Canal não encontrado. Verifique se você é membro do canal e se o Channel ID está correto.",
  member_inactive: "Sua assinatura não está ativa. Renove seu membership no YouTube para resgatar os benefícios.",
  update_failed: "Erro ao gerar seu código. Tente novamente.",
  invalid_channel_id: "Channel ID inválido. Ele deve começar com UC seguido de 22 caracteres.",
  invalid_body: "Requisição inválida. Tente novamente.",
  too_many_requests: "Muitas tentativas. Aguarde 1 hora e tente novamente.",
  unknown: "Algo deu errado. Tente novamente.",
};

const CHANNEL_ID_PATTERN = /^UC[a-zA-Z0-9_-]{22}$/;

const steps = [
  {
    number: "01",
    title: "Acesse sua conta no YouTube",
    description: "Abra o YouTube e clique na sua foto de perfil no canto superior direito.",
  },
  {
    number: "02",
    title: "Vá nas configurações avançadas",
    description: 'Clique em "Sua conta no YouTube" e depois em "Configurações avançadas" no menu lateral.',
    link: {
      label: "Abrir configurações avançadas",
      url: "https://www.youtube.com/account_advanced",
    },
  },
  {
    number: "03",
    title: "Copie seu Channel ID",
    description: 'Na seção "Informações do canal", copie o ID do canal — começa com "UC" seguido de letras e números.',
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

export const StepThree = ({ onRedeem, isLoading, error, errorMessage }: Props) => {
  const [channelId, setChannelId] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = channelId.trim();

    if (!trimmed) {
      setValidationError("Cole seu Channel ID no campo acima.");
      return;
    }

    if (!CHANNEL_ID_PATTERN.test(trimmed)) {
      setValidationError('Channel ID inválido. Deve começar com "UC" seguido de 22 caracteres.');
      return;
    }

    setValidationError(null);
    onRedeem(trimmed);
  };

  const activeError = validationError ?? (error ? (errorMessage ?? ERROR_MESSAGES[error]) : null);

  return (
    <StepWrapper>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-skorpion-red">
          <Gift className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.25em]">Resgate</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
          GARANTA SEU<br />BENEFÍCIO
        </h2>
        <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg">
          Para resgatar, informe o ID do seu canal do YouTube. O processo é rápido e leva menos de um minuto.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5"
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={itemVariants} className="flex items-start gap-5">
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
              {step.link && (
                <a
                  href={step.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-skorpion-red text-xs font-black uppercase tracking-widest hover:text-skorpion-red/70 transition-colors duration-200 w-fit"
                >
                  {step.link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-3">
        <label className="text-[#1A1A1A]/40 text-xs font-black uppercase tracking-widest">
          Seu Channel ID
        </label>
        <input
          type="text"
          value={channelId}
          onChange={(e) => {
            setChannelId(e.target.value);
            setValidationError(null);
          }}
          placeholder="UCxxxxxxxxxxxxxxxxxxxxxxxx"
          className="w-full px-5 py-4 rounded-2xl border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.02] font-mono text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/20 focus:outline-none focus:border-[#1A1A1A]/30 transition-colors duration-200"
        />

        {activeError && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100"
          >
            <AlertCircle className="w-4 h-4 text-skorpion-red shrink-0 mt-0.5" />
            <p className="text-skorpion-red text-xs font-medium leading-relaxed">
              {activeError}
            </p>
          </motion.div>
        )}
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.97 }}
        className="group relative self-start flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        <span className="relative z-10">
          {isLoading ? "Verificando..." : "Verificar e gerar código"}
        </span>
      </motion.button>
    </StepWrapper>
  );
};