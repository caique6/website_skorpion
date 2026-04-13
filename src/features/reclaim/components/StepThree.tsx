"use client";

import { motion } from "framer-motion";
import { Gift, AlertCircle, LogOut } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { StepWrapper } from "./StepWrapper";
import { ReclaimError } from "../types";

interface Props {
  onGoogleSignIn: () => void;
  onRedeem: () => void;
  onSignOut: () => void;
  isLoading: boolean;
  error: ReclaimError | null;
}

const ERROR_MESSAGES: Record<ReclaimError, string> = {
  member_not_found: "Esse e-mail não está cadastrado como membro do canal. Verifique se está usando a conta correta.",
  update_failed: "Erro ao salvar seu código. Tente novamente.",
  unauthorized: "Não foi possível autenticar com o Google. Tente novamente.",
  unknown: "Algo deu errado. Tente novamente.",
};

const steps = [
  {
    number: "01",
    title: "Entre com o Google",
    description: "Use a conta Google vinculada ao seu canal do YouTube — a mesma que você usa para assinar o clube de membros do Skorpion.",
    highlight: true,
  },
  {
    number: "02",
    title: "Sincronização automática",
    description: "O sistema vai verificar automaticamente se sua assinatura está ativa e qual é o seu plano.",
    highlight: false,
  },
  {
    number: "03",
    title: "Gere seu código",
    description: "Com a conta verificada, clique no botão abaixo para gerar seu código único de resgate.",
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

export const StepThree = ({ onGoogleSignIn, onRedeem, onSignOut, isLoading, error }: Props) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user?.email;

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
          <motion.div key={step.number} variants={itemVariants} className="flex items-start gap-5">
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

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-[16px] bg-red-50 border border-red-100"
        >
          <AlertCircle className="w-4 h-4 text-skorpion-red shrink-0 mt-0.5" />
          <p className="text-skorpion-red text-xs lg:text-sm font-medium leading-relaxed">
            {ERROR_MESSAGES[error]}
          </p>
        </motion.div>
      )}

      {isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 240, damping: 28 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 p-4 rounded-[16px] border border-[#1A1A1A]/08 bg-[#1A1A1A]/[0.03]">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session?.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-black text-sm text-[#1A1A1A] truncate">
                {session?.user?.name}
              </span>
              <span className="text-xs text-[#1A1A1A]/40 font-medium truncate">
                {session?.user?.email}
              </span>
            </div>
            <motion.button
              onClick={onSignOut}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 rounded-full border border-[#1A1A1A]/12 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors duration-200 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <motion.button
            onClick={onRedeem}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            <span className="relative z-10">
              {isLoading ? "Verificando..." : "Gerar meu código"}
            </span>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 240, damping: 28 }}
        >
          <motion.button
            onClick={onGoogleSignIn}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            <FaGoogle className="relative z-10 w-4 h-4" />
            <span className="relative z-10">
              {isLoading ? "Aguarde..." : "Entrar com Google"}
            </span>
          </motion.button>
        </motion.div>
      )}
    </StepWrapper>
  );
};