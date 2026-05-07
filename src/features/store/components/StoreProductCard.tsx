"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { StoreProduct } from "../types";

interface Props {
  product: StoreProduct;
  index: number;
  total: number;
}

const FLOATING_EMOJIS = [
  { emoji: "🎮", delay: 0, duration: 3.8 },
  { emoji: "⚡", delay: 1.2, duration: 4.4 },
  { emoji: "🔥", delay: 0.5, duration: 3.2 },
];

export const StoreProductCard = ({ product, index, total }: Props) => {
  const isSingle = total === 1;

  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 26 } }}
      className="group relative flex flex-col rounded-[24px] overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {isSingle && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {FLOATING_EMOJIS.map((item, i) => (
            <motion.span
              key={i}
              className="absolute text-xl select-none"
              style={{ left: `${20 + i * 30}%`, top: "-5%" }}
              animate={{
                y: ["0%", "600%"],
                opacity: [0, 0.6, 0.6, 0],
                rotate: [-8, 8, -4, 6, 0],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              {item.emoji}
            </motion.span>
          ))}
        </div>
      )}

      <div
        className="relative w-full overflow-hidden shrink-0"
        style={{
          background: "rgba(255,255,255,0.97)",
          aspectRatio: isSingle ? "3/2" : "1/1",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "linear-gradient(135deg, rgba(230,25,59,0.15) 0%, transparent 100%)",
          }}
        />

        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes={
              isSingle
                ? "90vw"
                : total === 2
                ? "50vw"
                : "(max-width: 768px) 50vw, 25vw"
            }
            className={isSingle ? "object-contain p-8" : "object-contain p-6"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-20 select-none">🎮</span>
          </div>
        )}
      </div>

      <div className={`flex flex-col gap-3 flex-1 ${isSingle ? "p-6 lg:p-8" : "p-5"}`}>
        <div className="flex flex-col gap-1.5 flex-1">
          <h3
            className={`font-black text-skorpion-white uppercase tracking-tight leading-tight group-hover:text-skorpion-white/80 transition-colors duration-200 line-clamp-2 ${isSingle ? "text-xl lg:text-2xl" : "text-sm lg:text-base"}`}
          >
            {product.name}
          </h3>
          <p
            className={`text-skorpion-white/45 font-medium leading-relaxed line-clamp-3 ${isSingle ? "text-sm" : "text-xs"}`}
          >
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/08">
          <span
            className={`font-black text-skorpion-white shrink-0 ${isSingle ? "text-2xl lg:text-3xl" : "text-lg"}`}
          >
            {product.price}
          </span>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 rounded-full bg-skorpion-white/10 hover:bg-skorpion-white/20 border border-white/10 hover:border-white/20 transition-all duration-300 shrink-0 ${isSingle ? "px-5 py-2.5" : "px-3.5 py-2"}`}
          >
            <span
              className={`font-black uppercase tracking-widest text-skorpion-white/70 ${isSingle ? "text-xs" : "text-[10px]"}`}
            >
              Comprar
            </span>
            <ExternalLink
              className={`text-skorpion-white/50 ${isSingle ? "w-4 h-4" : "w-3 h-3"}`}
            />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};