"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HeaderData, NavItem } from "../types";
import { DropdownMenu } from "./DropdownMenu";
import { MobileMenu } from "./MobileMenu";

interface Props {
  data: HeaderData;
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.dropdown) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <motion.button
          className="flex items-center gap-1.5 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200"
          whileTap={{ scale: 0.97 }}
        >
          {item.label}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/40 text-[10px]"
          >
            ▾
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && <DropdownMenu items={item.dropdown} />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.anchor ?? "#"}
      className="px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200"
    >
      {item.label}
    </Link>
  );
}

export const Header = ({ data }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30 w-full px-6 md:px-12 lg:px-16 py-6 flex items-center justify-center">
        <nav className="hidden lg:flex items-center gap-1">
          {data.nav.map((item) => (
            <DesktopNavItem key={item.id} item={item} />
          ))}
        </nav>

        <motion.button
          onClick={() => setMobileOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white"
        >
          <Menu className="w-4 h-4" strokeWidth={2.5} />
        </motion.button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          />
        )}
      </AnimatePresence>

      <MobileMenu
        data={data}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
};