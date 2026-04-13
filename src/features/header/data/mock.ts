import { HeaderData } from "../types";

export const HEADER_MOCK: HeaderData = {
  nav: [
    {
      id: "nav-home",
      label: "Início",
      anchor: "#top",
    },
    {
      id: "nav-channel",
      label: "Canal",
      anchor: "#channel",
    },
    {
      id: "nav-members",
      label: "Clube de Membros",
      dropdown: [
        {
          id: "drop-redeem",
          label: "Resgatar Benefícios",
          description: "Gere seu código e acesse os grupos exclusivos.",
          url: "/resgatar",
        },
        {
          id: "drop-ranking",
          label: "Ranking de Membros",
          description: "Veja os membros mais engajados da comunidade.",
          url: "/ranking",
        },
        {
          id: "drop-plans",
          label: "Ver Planos",
          description: "Conheça os três níveis do clube e escolha o seu.",
          url: "#members",
        },
      ],
    },
  ],
};