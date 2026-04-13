"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
};

const glitchVariants = {
  initial: { x: 0, opacity: 1 },
  animate: {
    x: [0, -4, 4, -2, 2, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 3.5,
      ease: "easeInOut",
    },
  },
};

const redLayerVariants = {
  initial: { x: 0, opacity: 0 },
  animate: {
    x: [0, 6, -6, 3, -3, 0],
    opacity: [0, 0.6, 0.6, 0.4, 0, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 3.5,
      ease: "easeInOut",
    },
  },
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 40%, rgba(230,25,59,0.12) 0%, transparent 65%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center gap-8 relative z-10 w-full max-w-2xl mx-auto"
      >
        <motion.div variants={itemVariants} className="relative select-none">
          <motion.span
            variants={redLayerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 font-black text-[clamp(120px,22vw,220px)] leading-none text-skorpion-red pointer-events-none"
            aria-hidden
          >
            404
          </motion.span>

          <motion.span
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            className="relative font-black text-[clamp(120px,22vw,220px)] leading-none text-white"
          >
            404
          </motion.span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 w-full">
          <h1 className="font-black text-2xl lg:text-4xl text-white uppercase tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-white/40 text-sm lg:text-base font-medium leading-relaxed text-center w-full max-w-xs mx-auto">
            Essa página não existe ou foi removida. Volte para o início e continue explorando.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
        >
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-widest overflow-hidden bg-skorpion-red text-white shadow-[0_8px_24px_rgba(230,25,59,0.35)]"
          >
            <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            <Home className="relative z-10 w-4 h-4" strokeWidth={2.5} />
            <span className="relative z-10">Ir para o início</span>
          </motion.button>

          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-widest text-white/40 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white/70 hover:border-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span>Voltar</span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 w-full mt-2"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="h-px flex-1 origin-right"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.12), transparent)" }}
          />
          <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.35em] shrink-0 whitespace-nowrap">
            Skorpion Gamer
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="h-px flex-1 origin-left"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.12), transparent)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}