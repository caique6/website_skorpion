"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { StoreProduct } from "../types";

interface Props {
  product: StoreProduct;
  index: number;
}

export const StoreProductCard = ({ product, index }: Props) => {
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 28,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 300, damping: 26 },
      }}
      className="group relative flex flex-col rounded-[24px] overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="relative w-full overflow-hidden shrink-0 bg-[rgba(255,255,255,0.97)]">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(230,25,59,0.15) 0%, transparent 100%)",
          }}
        />

        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-auto object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center aspect-square w-full">
            <span className="text-6xl opacity-20 select-none">🛒</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 flex-1 p-5 lg:p-6">
        <div className="flex flex-col gap-1.5 flex-1 text-left">
          <h3 className="font-black text-skorpion-white uppercase tracking-tight leading-tight group-hover:text-skorpion-white/80 transition-colors duration-200 text-lg lg:text-xl">
            {product.name}
          </h3>
          <p className="text-skorpion-white/45 font-medium leading-relaxed text-xs lg:text-sm">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/08 mt-auto">
          <span className="font-black text-[#F2CE16] shrink-0 text-xl lg:text-2xl">
            {product.price}
          </span>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-skorpion-white/10 hover:bg-skorpion-white/20 border border-white/10 hover:border-white/20 transition-all duration-300 shrink-0 px-4 py-2"
          >
            <span className="font-black uppercase tracking-widest text-skorpion-white/70 text-[10px] lg:text-xs">
              Comprar
            </span>
            <ExternalLink className="text-skorpion-white/50 w-3 h-3 lg:w-4 lg:h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};
