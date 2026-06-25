import { LiveMessageContent } from "../types";

export const LIVE_MESSAGE_MOCK: LiveMessageContent = {
  eyebrow: "Ao Vivo",
  headlineLines: ["MANDE SUA", "MENSAGEM NA LIVE"],
  subtitle:
    "Use seu código de membro para enviar uma mensagem que aparece e é narrada na transmissão do Skorpion.",
  codeLabel: "Seu código de resgate",
  codePlaceholder: "SKORP-XXXX-XXXX",
  nameLabel: "Como você quer aparecer",
  namePlaceholder: "Seu nome ou apelido",
  nameMaxLength: 24,
  messageLabel: "Sua mensagem",
  messagePlaceholder: "Escreva o que vai aparecer na live...",
  messageMaxLength: 200,
  submitLabel: "Ver prévia",
  submitLoadingLabel: "Verificando...",
  info: {
    eyebrow: "Como funciona",
    title: "Manda bem na live",
    steps: [
      "Cole seu código de resgate e escolha como quer aparecer.",
      "Escreva sua mensagem e confira a prévia antes de enviar.",
      "Confirme: ela aparece e é narrada ao vivo na transmissão!",
    ],
    cooldownTitle: "Tempo de espera por plano",
    cooldowns: [
      { tier: "skorpionzinho", wait: "1 mensagem a cada 24h" },
      { tier: "skorpiao", wait: "1 mensagem a cada 1h" },
      { tier: "skorpionario", wait: "1 mensagem a cada 15min" },
    ],
    rulesTitle: "Combinado da galera",
    rules:
      "Aqui é zoeira do bem! Nada de palavrões, ofensas ou desrespeito com ninguém. Quem passar do limite pode ser banido da ferramenta — então bora manter a vibe leve, beleza?",
  },
  preview: {
    eyebrow: "Prévia",
    headlineLines: ["CONFIRA", "SUA MENSAGEM"],
    subtitle:
      "É exatamente assim que ela vai aparecer na transmissão. Confirme para entrar na fila.",
    alertSuffix: "mandou um recado",
    listenLabel: "Ouvir prévia",
    listeningLabel: "Reproduzindo...",
    confirmLabel: "Enviar para a live",
    confirmLoadingLabel: "Enviando...",
    backLabel: "Voltar",
  },
  success: {
    headlineLines: ["MENSAGEM", "ENVIADA!"],
    subtitle:
      "Pronto! Sua mensagem entrou na fila e vai aparecer na live em instantes.",
    resetLabel: "Enviar outra",
  },
  cooldown: {
    eyebrow: "Calma aí",
    headlineLines: ["CÓDIGO EM", "COOLDOWN"],
    subtitle:
      "Você precisa esperar antes de enviar outra mensagem. O tempo de espera depende do seu plano.",
    resetLabel: "Tentar com outro código",
  },
  errors: {
    code_required: "Digite seu código de resgate.",
    name_required: "Escolha como você quer aparecer na live.",
    message_required: "Escreva sua mensagem antes de continuar.",
    invalid_code: "Código inválido. O formato é SKORP-XXXX-XXXX.",
    code_not_found: "Código não encontrado. Verifique e tente novamente.",
    member_inactive: "Esse código está inativo. Renove seu membership para continuar.",
    membership_expired: "Sua assinatura expirou. Renove para enviar mensagens.",
    invalid_tier: "Seu plano não permite enviar mensagens ao vivo.",
    too_many_requests: "Muitas tentativas. Aguarde um pouco e tente de novo.",
    network: "Falha de conexão. Tente novamente.",
    unknown: "Algo deu errado. Tente novamente.",
  },
};
