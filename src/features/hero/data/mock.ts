import { HeroData } from "../types";

export const HERO_MOCK: HeroData = {
  intro: [
    {
      id: "intro-welcome",
      text: "Olá, seja bem vindo ao Hub do Skorpion!",
      durationMs: 2600,
    },
    {
      id: "intro-context",
      text: "Aqui você consegue ter contato com tudo do canal.",
      subtext:
        "Da comunidade ao resgate de benefícios é por aqui que você começa.",
      durationMs: 3400,
    },
  ],
  headline: [
    { id: "headline-lead", text: "Resgate aqui seus", emphasis: false },
    {
      id: "headline-emphasis",
      text: "benefícios do clube de membros.",
      emphasis: true,
    },
  ],
  subtitle:
    "Acompanhe toda a nossa comunidade por aqui e tenha acesso a muito mais!",
  actions: {
    subscribed: {
      label: "Já é inscrito?",
      channels: [
        {
          id: "channel-blox",
          label: "Skorpion Blox",
          url: "https://www.youtube.com/@SkorpionRoblox",
          tone: "yellow",
        },
        {
          id: "channel-gamer",
          label: "Skorpion Gamer",
          url: "https://www.youtube.com/@SkorpionOFICIAL",
          tone: "red",
        },
      ],
    },
    membership: {
      label: "Quero ser membro!",
      url: "https://www.youtube.com/@SkorpionOFICIAL/membership",
    },
  },
};
