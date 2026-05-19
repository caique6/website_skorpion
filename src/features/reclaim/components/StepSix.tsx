"use client";

import { motion } from "framer-motion";
import { Gamepad2, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { StepWrapper } from "./StepWrapper";

export const StepSix = () => {
  const router = useRouter();

  return (
    <StepWrapper>
      <div className="flex flex-col items-center text-center gap-6 py-6 sm:py-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="w-20 h-20 rounded-full bg-skorpion-red/10 flex items-center justify-center text-3xl select-none"
        >
          🦂
        </motion.div>

        <div className="flex flex-col gap-3 max-w-md">
          <div className="flex items-center justify-center gap-2 text-skorpion-red">
            <Gamepad2 className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">
              Sucesso
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.1]">
            Agora você faz parte da melhor comunidade gamer!
          </h2>
          <p className="text-skorpion-red text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-wide mt-2">
            Bem-vindo à família Skorpionária!
          </p>
        </div>

        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm tracking-wide uppercase overflow-hidden bg-[#1A1A1A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] mt-4"
        >
          <div className="absolute inset-0 bg-skorpion-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          <Home className="relative z-10 w-4 h-4" />
          <span className="relative z-10">Voltar ao início</span>
        </motion.button>
      </div>
    </StepWrapper>
  );
};
