"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { StoreData } from "../types";
import { StoreProductCard } from "./StoreProductCard";

interface Props {
  data: StoreData;
}

const GRID_CLASS: Record<number, string> = {
  1: "grid-cols-1 max-w-sm mx-auto",
  2: "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto",
  3: "grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto",
};

function resolveGridClass(total: number): string {
  return GRID_CLASS[total] ?? "grid-cols-2 lg:grid-cols-3 w-full";
}

export const StoreSection = ({ data }: Props) => {
  const total = data.products.length;

  return (
    <section className="relative w-full flex items-center justify-center py-8 lg:py-14 px-4 md:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-full max-w-5xl relative z-10 rounded-[28px] lg:rounded-[32px] shadow-2xl overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(230,25,59,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col w-full p-6 sm:p-8 md:p-10 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: 0.1,
            }}
            className="flex flex-col items-start text-left gap-1.5"
          >
            <div className="flex items-center gap-2 text-skorpion-white/40">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                Loja
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-skorpion-white uppercase tracking-tight leading-[1.05]">
              EQUIPAMENTOS DO SKORPION
            </h2>
            <p className="text-skorpion-white/50 text-xs lg:text-sm font-medium max-w-lg leading-relaxed">
              Os produtos que o Skorpion usa e recomenda. Clique para comprar no
              site oficial.
            </p>
          </motion.div>

          {total === 0 ? (
            <div className="flex items-center justify-center py-16">
              <span className="text-skorpion-white/20 text-sm font-black uppercase tracking-widest">
                Nenhum produto disponível
              </span>
            </div>
          ) : (
            <div className={`grid gap-4 lg:gap-6 ${resolveGridClass(total)}`}>
              {data.products.map((product, index) => (
                <StoreProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
