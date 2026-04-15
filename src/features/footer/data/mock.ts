import { FooterData } from "../types";

export const FOOTER_MOCK: FooterData = {
  tagline: "O canal de GTA RP mais insano do Brasil.",
  copyright: "© 2025 Skorpion Gamer. Todos os direitos reservados.",
  clubName: "Amigos do Skorpion",
  socials: [
    {
      id: "s-01",
      label: "YouTube",
      url: "https://www.youtube.com/@SkorpionOFICIAL",
      icon: "youtube",
    },
    {
      id: "s-02",
      label: "Instagram",
      url: "https://www.instagram.com/skorpion/",
      icon: "instagram",
    },
    {
      id: "s-03",
      label: "TikTok",
      url: "https://www.tiktok.com/@skorpionoficial",
      icon: "tiktok",
    },
  ],
  navLinks: [
    { id: "n-01", label: "Início", href: "#top", external: false },
    { id: "n-02", label: "Canal", href: "#channel", external: false },
    { id: "n-03", label: "Membros", href: "#members", external: false },
    { id: "n-04", label: "Loja", href: "#store", external: false },
  ],
  clubLinks: [
    { id: "c-01", label: "Resgatar Benefícios", href: "/resgatar", external: false },
    { id: "c-02", label: "Ranking de Membros", href: "/ranking", external: false },
    { id: "c-03", label: "Política de Privacidade", href: "/privacidade", external: false },
  ],
  channelLinks: [
    { id: "ch-01", label: "YouTube", href: "https://www.youtube.com/@SkorpionOFICIAL", external: true },
    { id: "ch-02", label: "Seja Membro", href: "https://www.youtube.com/@SkorpionOFICIAL/membership", external: true },
    { id: "ch-03", label: "Vídeos", href: "https://www.youtube.com/@SkorpionOFICIAL/videos", external: true },
  ],
};