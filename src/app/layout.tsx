import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skorpion Gamer | O Epicentro da Gameplay",
  description: "Estratégias avançadas, comunidade engajada e os melhores benefícios do clube de membros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={cn(montserrat.className, "antialiased min-h-screen")}>
        {children}
      </body>
    </html>
  );
}