import { HeroData } from "../types";

export const HERO_MOCK: HeroData = {
  title: "BATE-PAPO, GAMEPLAY E DIVERSÃO INSANA",
  subtitle: "Esse é o espaço da nossa comunidade. Aqui você acompanha o canal, conhece o clube de membros e faz parte de verdade.",
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