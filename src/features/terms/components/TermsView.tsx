"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { TERMS_SECTIONS } from "../data/sections";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

export const TermsView = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="w-full flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 border-b border-[#1A1A1A]/06"
      >
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-full border border-[#1A1A1A]/12 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 hover:border-[#1A1A1A]/25 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
          <span className="font-black text-sm uppercase tracking-widest text-[#1A1A1A]/30">Skorpion</span>
        </div>
        <div className="flex items-center gap-2 text-[#1A1A1A]/25">
          <FileText className="w-4 h-4" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em]">Termos de Uso</span>
        </div>
      </motion.header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-12 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="flex flex-col gap-3 mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 text-skorpion-red">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">Termos de Uso</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
            REGRAS<br />CLARAS PARA<br />TODOS
          </h1>
          <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg mt-2">
            Condições de uso da plataforma de resgate de benefícios do Clube Amigos do Skorpion Gamer.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10 lg:gap-12"
        >
          {TERMS_SECTIONS.map((section, index) => (
            <motion.div key={section.id} variants={item} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-black text-[11px] text-[#1A1A1A]/20 tracking-widest shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-[#1A1A1A]/08" />
              </div>
              <div className="flex flex-col gap-3 pl-0 lg:pl-9">
                <h2 className="font-black text-lg lg:text-xl text-[#1A1A1A] uppercase tracking-tight">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.content.split("\n\n").map((paragraph, pIndex) => (
                    <div key={pIndex} className="flex flex-col gap-1">
                      {paragraph.startsWith("•") ? (
                        <ul className="flex flex-col gap-2">
                          {paragraph.split("\n").map((line, lIndex) => (
                            <li key={lIndex} className="flex items-start gap-3">
                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-skorpion-red shrink-0" />
                              <span className="text-[#1A1A1A]/60 text-sm lg:text-base font-medium leading-relaxed">
                                {line.replace("• ", "")}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[#1A1A1A]/60 text-sm lg:text-base font-medium leading-relaxed">
                          {paragraph}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-between mt-16 pt-8 border-t border-[#1A1A1A]/08"
        >
          <span className="text-[#1A1A1A]/25 text-xs font-medium">Última atualização: Junho de 2026</span>
          <span className="text-[#1A1A1A]/25 text-xs font-black uppercase tracking-widest">Skorpion Gamer</span>
        </motion.div>
      </main>
    </div>
  );
};
