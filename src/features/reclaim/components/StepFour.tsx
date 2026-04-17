"use client";

import { motion } from "framer-motion";
import { CheckCircle, Copy, MessageCircle, Zap, RotateCcw } from "lucide-react";
import { useState } from "react";
import { StepWrapper } from "./StepWrapper";
import { TIER_CONFIG } from "@/features/ranking/utils/ranking.utils";
import { PlanTier } from "@/features/ranking/types";

interface Props {
  code: string;
  tier: string;
  onStartOver: () => void;
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;

export const StepFour = ({ code, tier, onStartOver }: Props) => {
  const [copied, setCopied] = useState(false);

  const tierConfig = TIER_CONFIG[tier as PlanTier] ?? null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Sou membro do canal do Skorpion e quero resgatar meu benefício.\n\nMeu código: ${code}`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <StepWrapper>
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
          className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center"
        >
          <CheckCircle className="w-7 h-7 text-green-500" strokeWidth={2} />
        </motion.div>

        <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
          CÓDIGO<br />GERADO!
        </h2>
        <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg">
          Seu código único foi gerado. Envie pelo WhatsApp para concluir o resgate.
        </p>
      </div>

      {tierConfig && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 28 }}
          className="flex items-center gap-2"
        >
          <span
            className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{
              color: tierConfig.color,
              backgroundColor: tierConfig.bg,
              borderColor: tierConfig.border,
            }}
          >
            {tierConfig.label}
          </span>
        </motion.div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-[#1A1A1A]/40 text-xs font-black uppercase tracking-widest">
          Seu código
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
          className="flex items-center justify-between gap-4 px-6 py-5 rounded-[20px] border-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.03]"
        >
          <span className="font-black text-xl lg:text-3xl text-[#1A1A1A] tracking-widest">
            {code}
          </span>
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A]/08 hover:bg-[#1A1A1A]/15 transition-colors duration-200"
          >
            <Copy className="w-4 h-4 text-[#1A1A1A]/50" />
            <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">
              {copied ? "Copiado!" : "Copiar"}
            </span>
          </motion.button>
        </motion.div>
      </div>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 240, damping: 28 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="group relative self-start flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden text-white shadow-[0_8px_24px_rgba(37,211,102,0.25)]"
        style={{ backgroundColor: "#25D366" }}
      >
        <div className="absolute inset-0 bg-[#128C7E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        <MessageCircle className="relative z-10 w-4 h-4" />
        <span className="relative z-10">Enviar pelo WhatsApp</span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 240, damping: 28 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-start gap-3 p-4 rounded-[16px] bg-[#1A1A1A]/[0.03] border border-[#1A1A1A]/08">
          <Zap className="w-4 h-4 text-skorpion-red shrink-0 mt-0.5" />
          <p className="text-[#1A1A1A]/55 text-xs lg:text-sm font-medium leading-relaxed">
            O processo é 100% automatizado — assim que o código for enviado, o sistema validará e liberará seu acesso automaticamente.
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
      </motion.div>
    </StepWrapper>
  );
};