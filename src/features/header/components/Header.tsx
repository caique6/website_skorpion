"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useIntro } from "@/features/intro/context/IntroProvider";
import { HeaderData } from "../types";
import { CtaMenu } from "./CtaMenu";
import { MobileMenu } from "./MobileMenu";

interface Props {
  data: HeaderData;
}

const pillVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

const navLinkClass =
  "px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-skorpion-black/70 hover:text-skorpion-red transition-colors duration-200";

export const Header = ({ data }: Props) => {
  const { isComplete } = useIntro();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center px-4 py-5">
        <motion.header
          variants={pillVariants}
          initial="hidden"
          animate={isComplete ? "visible" : "hidden"}
          className={`flex items-center gap-2 sm:gap-4 rounded-full border border-skorpion-black/10 bg-skorpion-white/90 px-3 py-2 shadow-[0_8px_30px_rgba(26,26,26,0.08)] backdrop-blur-md ${isComplete ? "" : "pointer-events-none"}`}
        >
          <nav className="hidden lg:flex items-center gap-1 pl-2">
            {data.nav.map((item) => (
              <Link key={item.id} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CtaMenu cta={data.cta} />
          </div>

          <motion.button
            onClick={() => setMobileOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-skorpion-black/5 text-skorpion-black"
          >
            <Menu className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
        </motion.header>
      </div>

      <MobileMenu
        data={data}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
};
