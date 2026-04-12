import { Zap } from "lucide-react";
import { HeroData } from "../types";

export const HERO_MOCK: HeroData = {
  title: "BATE-PAPO, GAMEPLAY E DIVERSÃO INSANA",
  subtitle: "O epicentro para jogar, relaxar e dominar as partidas. Faça parte de uma comunidade global, resgate benefícios exclusivos e suba o nível da sua jornada.",
  heroImage: "/images/hero-logo.png",
  actions: [
    {
      id: "action-youtube",
      label: "Acessar o YouTube",
      url: "https://www.youtube.com/@SkorpionOFICIAL",
      variant: "primary",
    },
    {
      id: "action-members",
      label: "Resgatar Benefícios",
      url: "/resgatar",
      variant: "secondary",
    },
  ],
};