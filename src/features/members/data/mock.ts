import { MembersData } from "../types";

export const MEMBERS_MOCK: MembersData = {
  intro: {
    subtitle: "O CANAL CONTINUA AQUI",
    title: "ENTRE PARA A NOSSA BASE",
    description: "Para quem quer ir além de só assistir. O clube é o nosso espaço direto para jogar junto, trocar ideia nos bastidores e fazer a comunidade crescer.",
    buttonLabel: "Ver os Planos",
    features: [
      {
        id: "feat-1",
        icon: "gamepad",
        title: "Gameplays com a Galera",
        description: "Participe das gravações e jogue lado a lado nas nossas sessões.",
      },
      {
        id: "feat-2",
        icon: "video",
        title: "Conteúdo Secreto",
        description: "Vídeos e shorts dos bastidores que não vão para o público geral.",
      },
      {
        id: "feat-3",
        icon: "message",
        title: "Resenha Direta",
        description: "Acesso aos nossos grupos no Discord e WhatsApp para trocar ideia.",
      },
    ],
  },
  plans: [
    {
      id: "tier-1",
      tier: 1,
      name: "Skorpionzinho",
      price: "R$ 3,99",
      billingCycle: "/ mês",
      highlighted: false,
      benefits: [
        { id: "t1-b1", title: "Acesso antecipado", description: "Assista aos vídeos antes de todo mundo." },
        { id: "t1-b2", title: "Prioridade nos comentários", description: "Resposta garantida do Skorpion." },
        { id: "t1-b3", title: "Selos e Emojis", description: "Destaque exclusivo no chat." },
      ],
    },
    {
      id: "tier-3",
      tier: 3,
      name: "Skorpionário",
      price: "R$ 49,99",
      billingCycle: "/ mês",
      highlighted: true,
      benefits: [
        { id: "t3-b1", title: "Acesso Total", description: "Todos os benefícios dos Tiers 1 e 2." },
        { id: "t3-b2", title: "Jogar e gravar comigo", description: "Faça parte das gravações ativamente." },
        { id: "t3-b3", title: "Resenha no Zap e Discord", description: "Chamadas de voz e papo direto." },
        { id: "t3-b4", title: "Painel no Morro-do-Sacola", description: "Seu nome eternizado no GTA." },
      ],
    },
    {
      id: "tier-2",
      tier: 2,
      name: "Skorpião",
      price: "R$ 19,99",
      billingCycle: "/ mês",
      highlighted: false,
      benefits: [
        { id: "t2-b1", title: "Tudo do Tier 1", description: "Todos os benefícios anteriores." },
        { id: "t2-b2", title: "Vídeos e Shorts Exclusivos", description: "Conteúdo premium só para membros." },
        { id: "t2-b3", title: "Seu nome nos vídeos", description: "Destaque nos conteúdos do canal." },
        { id: "t2-b4", title: "Grupos VIP", description: "Discord e Zap para novidades." },
      ],
    },
  ],
};