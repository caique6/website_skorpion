import { HeaderData } from "../types";

export const HEADER_MOCK: HeaderData = {
  nav: [
    {
      id: "nav-channel",
      label: "Canal",
      href: "#channel",
    },
    {
      id: "nav-ranking",
      label: "Ranking dos Membros",
      href: "/ranking",
    },
  ],
  cta: {
    label: "Resgatar Benefícios",
    options: [
      {
        id: "cta-whatsapp",
        label: "Grupos de WhatsApp",
        description: "Entre nos grupos VIP do seu plano de membro.",
        href: "/resgatar",
        icon: "whatsapp",
      },
      {
        id: "cta-live",
        label: "Benefícios da Live",
        description: "Mande uma mensagem que aparece na transmissão.",
        href: "/mensagem-ao-vivo",
        icon: "live",
      },
    ],
  },
};
