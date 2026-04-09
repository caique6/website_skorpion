import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";

const dmsans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"]
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Skorpion Community",
  description: "Plataforma exclusiva para resgate de benefícios dos membros do canal Skorpion Gamer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmsans.variable} ${montserrat.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}