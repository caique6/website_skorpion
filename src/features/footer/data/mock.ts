import { FooterData } from "../types";

export const FOOTER_MOCK: FooterData = {
  tagline: "O canal de GTA RP mais insano do Brasil.",
  discord: {
    title: "Comunidade no Discord",
    subtitle: "Fique por dentro de tudo e jogue com o Skorpion.",
    label: "Entrar no Discord",
    url: "https://discord.gg/A9DsDhcJTM",
  },
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
  columns: [
    {
      id: "col-clube",
      title: "Clube",
      links: [
        { id: "c-01", label: "Resgatar Benefícios", href: "/resgatar", external: false },
        { id: "c-02", label: "Ranking de Membros", href: "/ranking", external: false },
      ],
    },
    {
      id: "col-institucional",
      title: "Institucional",
      links: [
        { id: "i-01", label: "Política de Privacidade", href: "/privacidade", external: false },
        { id: "i-02", label: "Termos de Uso", href: "/termos", external: false },
      ],
    },
    {
      id: "col-canal",
      title: "Canal",
      links: [
        { id: "ch-01", label: "YouTube", href: "https://www.youtube.com/@SkorpionOFICIAL", external: true },
        { id: "ch-02", label: "Seja Membro", href: "https://www.youtube.com/@SkorpionOFICIAL/membership", external: true },
        { id: "ch-03", label: "Vídeos", href: "https://www.youtube.com/@SkorpionOFICIAL/videos", external: true },
      ],
    },
  ],
  copyright: "© 2026 Skorpion Gamer. Todos os direitos reservados.",
  clubName: "Amigos do Skorpion",
};
