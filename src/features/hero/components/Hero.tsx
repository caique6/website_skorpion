"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { HeroData, HeroAction } from "../types";
import { YoutubeChannelMenu } from "./YoutubeChannelMenu";

interface HeroProps {
  data: HeroData;
}

/* ─────────────────────────────────────────
   Springs iOS — cada ação tem o seu ritmo
───────────────────────────────────────── */
const SP_LAYOUT = { type: "spring", stiffness: 360, damping: 32, mass: 0.85 } as const; // tamanho/posição
const SP_TEXT   = { type: "spring", stiffness: 460, damping: 36, mass: 0.70 } as const; // troca de texto
const SP_SCALE  = { type: "spring", stiffness: 320, damping: 26, mass: 0.90 } as const; // escala hover

/* ─────────────────────────────────────────
   Animação de fogo no personagem
───────────────────────────────────────── */
const fireVariants = {
  rest:  { scale: 0, opacity: 0, filter: "blur(10px)" },
  hover: { scale: 1.8, opacity: 1, filter: "blur(25px)", transition: SP_SCALE },
};
const fireLayer = "absolute inset-0 rounded-full mix-blend-screen -z-10";

/* ─────────────────────────────────────────
   Botão VIP
───────────────────────────────────────── */
interface VipButtonProps {
  action: HeroAction;
  onHoverChange: (h: boolean) => void;
}

function VipButton({ action, onHoverChange }: VipButtonProps) {
  const [hovered, setHovered] = useState(false);

  const handle = (h: boolean) => { setHovered(h); onHoverChange(h); };

  return (
    <motion.div
      layout
      layoutId="vip-btn"
      className="relative p-[2px] rounded-full w-full"
      onHoverStart={() => handle(true)}
      onHoverEnd={() => handle(false)}
      animate={{ scale: hovered ? 1.03 : 1 }}
      transition={SP_SCALE}
    >
      {/* Borda gradiente */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(135deg, #F2CE16 0%, #F27127 35%, #F21B42 65%, #F2CE16 100%)" }}
      />

      {/* Glow pulsante */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(242,206,22,0.20), 0 0 20px 4px rgba(242,27,66,0.12)",
            "0 0 22px 6px rgba(242,206,22,0.55), 0 0 40px 10px rgba(242,27,66,0.25)",
            "0 0 10px 2px rgba(242,206,22,0.20), 0 0 20px 4px rgba(242,27,66,0.12)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Botão — padding anima junto com o tamanho via layout */}
      <motion.a
        layout
        href={action.url}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center justify-center gap-2.5 rounded-full font-black text-[13px] tracking-[0.08em] uppercase whitespace-nowrap overflow-hidden w-full"
        animate={
          hovered
            ? { paddingTop: 18, paddingBottom: 18, paddingLeft: 28, paddingRight: 28 }
            : { paddingTop: 18, paddingBottom: 18, paddingLeft: 24, paddingRight: 24 }
        }
        transition={SP_LAYOUT}
        style={{
          background: "linear-gradient(135deg, #1c0600 0%, #0d0010 100%)",
          color: "#F2CE16",
        }}
      >
        {/* 🔥 fixo */}
        <motion.span layout transition={SP_LAYOUT} className="text-base leading-none flex-shrink-0">
          🔥
        </motion.span>

        {/* Texto com slide vertical — cada estado tem sua própria animação */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={hovered ? "exp" : "col"}
            initial={{ opacity: 0, y: hovered ? 10 : -10 }}
            animate={{ opacity: 1,  y: 0 }}
            exit={{    opacity: 0,  y: hovered ? -10 : 10 }}
            transition={SP_TEXT}
            layout
            className="flex-shrink-0"
          >
            {hovered ? "Quero resgatar os benefícios!" : "Sim, já sou."}
          </motion.span>
        </AnimatePresence>

        {/* Chevron fixo */}
        <motion.span layout transition={SP_LAYOUT} className="flex-shrink-0">
          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */
export const Hero = ({ data }: HeroProps) => {
  const [vipHovered, setVipHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 xl:gap-16 z-10 py-20 lg:py-0">

        {/* ── Coluna esquerda ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">

          <h1 className="text-5xl sm:text-6xl lg:text-[5.33rem] leading-[1.05] font-black text-skorpion-white mb-6 tracking-tight uppercase drop-shadow-md">
            {data.title}
          </h1>

          <p className="text-lg sm:text-xl lg:text-[1.45rem] text-skorpion-white/90 mb-8 max-w-xl font-medium leading-relaxed drop-shadow-sm">
            {data.subtitle}
          </p>

          {/* Divisor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-4 w-full max-w-xl mb-7"
          >
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 whitespace-nowrap shrink-0">
              Você é membro do canal?
            </span>
            <div className="h-px flex-1 bg-white/30" />
          </motion.div>

          {/* ── Área dos botões ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="w-full sm:max-w-[580px]"
          >
            {/*
              LayoutGroup garante que as animações de layout dos dois botões
              sejam coordenadas — quando um muda de tamanho, o outro responde
              no mesmo frame com seu próprio spring.
            */}
            <LayoutGroup id="hero-btns">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">

                {data.actions.map((action) =>
                  action.channels ? (
                    /* Botão primário — encolhe para ícone no hover do VIP */
                    <motion.div
                      key={action.id}
                      layout
                      transition={SP_LAYOUT}
                      className="sm:shrink-0"
                    >
                      <YoutubeChannelMenu action={action} condensed={vipHovered} />
                    </motion.div>
                  ) : action.variant === "secondary" ? (
                    /* VIP — cresce para preencher o espaço liberado */
                    <motion.div
                      key={action.id}
                      layout
                      transition={SP_LAYOUT}
                      className="sm:flex-1 sm:min-w-0"
                    >
                      <VipButton action={action} onHoverChange={setVipHovered} />
                    </motion.div>
                  ) : (
                    <motion.a
                      key={action.id}
                      layout
                      href={action.url}
                      target={action.url.startsWith("http") ? "_blank" : undefined}
                      rel={action.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-base tracking-wide uppercase overflow-hidden whitespace-nowrap bg-gradient-to-r from-skorpion-red to-[#ff3b3b] text-skorpion-white shadow-[0_8px_20px_rgba(242,27,66,0.4)] hover:shadow-[0_12px_30px_rgba(242,27,66,0.6)]"
                      transition={SP_LAYOUT}
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                      <span className="relative z-10">{action.label}</span>
                      <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </motion.a>
                  )
                )}

              </div>
            </LayoutGroup>
          </motion.div>
        </div>

        {/* ── Coluna direita — personagem ── */}
        <div className="relative w-full flex justify-center lg:justify-end items-center lg:-translate-x-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover="hover"
            className="group relative w-full max-w-[320px] sm:max-w-[480px] md:max-w-[550px] lg:max-w-[1080px] aspect-square pointer-events-auto cursor-pointer"
            transition={{ type: "spring", stiffness: 220, damping: 22, mass: 1.2 }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center -z-10"
              variants={{ rest: {}, hover: { transition: { staggerChildren: 0.05 } } }}
            >
              <motion.div variants={fireVariants} className={fireLayer}
                style={{ background: "radial-gradient(circle, #BF2604 0%, transparent 70%)" }} />
              <motion.div variants={fireVariants} className={fireLayer}
                style={{ background: "radial-gradient(circle, #F21B42 0%, transparent 60%)" }} />
              <motion.div variants={fireVariants} className={fireLayer}
                style={{ background: "radial-gradient(circle, #F2CE16 0%, #D9183B 40%, transparent 65%)" }} />
            </motion.div>

            <motion.div
              className="w-full h-full"
              variants={{
                rest:  { scale: 1 },
                hover: { scale: 1.08, transition: { type: "spring", stiffness: 300, damping: 20 } },
              }}
            >
              <Image
                src={data.heroImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1080px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
