"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { StoreData } from "../types";
import { StoreProductCard } from "./StoreProductCard";

interface Props {
  data: StoreData;
}

export const StoreSection = ({ data }: Props) => {
  const featured = data.products.find((p) => p.featured) ?? null;
  const rest = data.products.filter((p) => !p.featured);

  return (
    <section className="relative w-full flex items-center justify-center py-10 lg:py-20 px-4 md:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-full max-w-7xl relative z-10 rounded-[32px] lg:rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        />

        <div className="relative z-10 flex flex-col w-full p-6 sm:p-8 md:p-12 lg:p-16 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-skorpion-white/40">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                Loja
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-skorpion-white uppercase tracking-tight leading-[1.05]">
              EQUIPAMENTOS DO SKORPION
            </h2>
            <p className="text-skorpion-white/50 text-sm lg:text-base font-medium max-w-xl leading-relaxed">
              Os produtos que o Skorpion usa e recomenda. Clique para comprar no site oficial.
            </p>
          </motion.div>

          {data.products.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <span className="text-skorpion-white/20 text-sm font-black uppercase tracking-widest">
                Nenhum produto disponível
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
              {featured && (
                <StoreProductCard product={featured} index={0} featured />
              )}
              {rest.map((product, index) => (
                <StoreProductCard
                  key={product.id}
                  product={product}
                  index={featured ? index + 1 : index}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};