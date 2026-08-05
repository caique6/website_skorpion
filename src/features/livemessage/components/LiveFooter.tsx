import Link from "next/link";
import { RESGATY_CREDIT } from "../utils/resgaty";

export const LiveFooter = () => (
  <footer className="flex flex-col items-center gap-2 border-t border-[#1A1A1A]/[0.06] px-6 py-3">
    <p className="text-center text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/25">
      {RESGATY_CREDIT}
    </p>
    <nav className="flex items-center gap-3 text-[11px] font-bold text-[#1A1A1A]/40">
      <Link href="/termos" className="transition-colors duration-200 hover:text-skorpion-red">
        Termos de uso
      </Link>
      <span className="text-[#1A1A1A]/15">•</span>
      <Link href="/privacidade" className="transition-colors duration-200 hover:text-skorpion-red">
        Política de privacidade
      </Link>
    </nav>
  </footer>
);
