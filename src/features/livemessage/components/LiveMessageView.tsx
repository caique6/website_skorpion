"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { LiveModeTabs } from "./LiveModeTabs";
import { MessageFlow } from "./MessageFlow";
import { DonationFlow } from "./DonationFlow";
import { LiveFooter } from "./LiveFooter";
import { MercadoPagoScript } from "./MercadoPagoScript";
import { LiveMode } from "../types";

const ICON_BUTTON =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[#1A1A1A]/[0.12] text-[#1A1A1A]/40 transition-colors duration-200 hover:border-[#1A1A1A]/25 hover:text-[#1A1A1A]/70";

export const LiveMessageView = () => {
  const router = useRouter();
  const [mode, setMode] = useState<LiveMode>("donation");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <MercadoPagoScript />
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="flex w-full items-center gap-3 border-b border-[#1A1A1A]/[0.06] px-4 py-3 md:px-12 md:py-4 lg:px-16"
      >
        <div className="flex flex-1 items-center gap-4">
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={ICON_BUTTON}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
          <span className="hidden text-sm font-black uppercase tracking-widest text-[#1A1A1A]/30 sm:inline">
            Skorpion
          </span>
        </div>

        <div className="w-[15rem] shrink-0 sm:w-96">
          <LiveModeTabs mode={mode} onChange={setMode} />
        </div>

        <div className="flex flex-1 justify-end">
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={ICON_BUTTON}
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-3 md:px-12 lg:justify-center lg:py-3">
        {mode === "message" ? <MessageFlow /> : <DonationFlow />}
      </main>

      <LiveFooter />
    </div>
  );
};
