"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { StoreProduct } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  product: StoreProduct;
  index: number;
  featured?: boolean;
}

const CATEGORY_LABEL: Record<StoreProduct["category"], string> = {
  gamer: "Gamer",
  escolar: "Escolar",
};

const CATEGORY_PLACEHOLDER: Record<StoreProduct["category"], string> = {
  gamer: "🎮",
  escolar: "🎒",
};

export const StoreProductCard = ({ product, index, featured = false }: Props) => {
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
      className={cn(
        "group relative flex flex-col rounded-[24px] overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer",
        featured ? "lg:col-span-2 lg:flex-row" : "flex-col"
      )}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div
        className={cn(
          "relative overflow-hidden shrink-0",
          featured
            ? "w-full lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[320px]"
            : "w-full aspect-video"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(230,25,59,0.2) 0%, rgba(10,10,10,0.95) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "linear-gradient(135deg, rgba(230,25,59,0.35) 0%, rgba(10,10,10,0.7) 100%)",
          }}
        />

        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl lg:text-8xl opacity-20 select-none">
              {CATEGORY_PLACEHOLDER[product.category]}
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 z-20">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-skorpion-white/70">
            {CATEGORY_LABEL[product.category]}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col justify-between gap-4 p-5 lg:p-7",
          featured ? "lg:flex-1" : ""
        )}
      >
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-black text-skorpion-white uppercase tracking-tight leading-tight group-hover:text-skorpion-white/90 transition-colors duration-200",
              featured ? "text-xl lg:text-3xl" : "text-base lg:text-lg"
            )}
          >
            {product.name}
          </h3>
          <p className="text-skorpion-white/50 text-xs lg:text-sm font-medium leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "font-black text-skorpion-white",
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            )}
          >
            {product.price}
          </span>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-skorpion-white/10 hover:bg-skorpion-white/20 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-skorpion-white/70">
              Comprar
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-skorpion-white/50" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};