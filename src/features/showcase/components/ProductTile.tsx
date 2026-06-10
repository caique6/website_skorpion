"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { EASE_OUT, TILE_FADE_UP } from "@/lib/animation";
import { StoreProduct } from "@/features/store/types";

interface Props {
  product: StoreProduct;
  className?: string;
}

export const ProductTile = ({ product, className }: Props) => {
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={TILE_FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={`group flex flex-col overflow-hidden rounded-3xl bg-skorpion-white shadow-[0_14px_40px_rgba(26,26,26,0.10)] ring-1 ring-skorpion-black/5 ${className ?? ""}`}
    >
      <div className="relative flex-1 overflow-hidden bg-gray-50">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
            🛒
          </span>
        )}
        {product.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-skorpion-yellow px-3 py-1 text-[10px] font-black uppercase tracking-widest text-skorpion-black">
            Destaque
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5">
        <h3 className="line-clamp-1 text-base font-black uppercase tracking-tight text-skorpion-black">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs font-medium leading-snug text-skorpion-black/50">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-black text-skorpion-red">
            {product.price}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-skorpion-black px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-skorpion-white transition-colors group-hover:bg-skorpion-red">
            Comprar
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.a>
  );
};
