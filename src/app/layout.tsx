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
  title: "Skorpion Gamer",
  description: "Skorpion Gamer — Estratégias avançadas, comunidade engajada e os melhores benefícios do clube de membros.",
  applicationName: "Skorpion Gamer",
  keywords: ["Skorpion Gamer", "GTA RP", "YouTube", "clube de membros"],
  authors: [{ name: "Skorpion Gamer" }],
  creator: "Skorpion Gamer",
  publisher: "Skorpion Gamer",
  metadataBase: new URL("https://skorpiongamer.com.br"),
  openGraph: {
    title: "Skorpion Gamer",
    description: "Estratégias avançadas, comunidade engajada e os melhores benefícios do clube de membros.",
    url: "https://skorpiongamer.com.br",
    siteName: "Skorpion Gamer",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
  },
  verification: {
    google: "T9ZDSIAp6RS2DaNWWyXPqY5E-hGmTrRxJ2PHwPG95nQ",
  },
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