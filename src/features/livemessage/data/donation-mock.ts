import { DonationContent } from "../types";

export const DONATION_MOCK: DonationContent = {
  eyebrow: "Doar via PIX",
  headlineLines: ["MANDE UM", "PIX NA LIVE"],
  subtitle:
    "Faça uma doação via PIX e sua mensagem aparece e é narrada ao vivo na transmissão do Skorpion.",
  nameLabel: "Como você quer aparecer",
  namePlaceholder: "Seu nome ou apelido",
  nameMaxLength: 24,
  messageLabel: "Sua mensagem",
  messagePlaceholder: "Escreva o que vai aparecer na live...",
  messageMaxLength: 200,
  voiceLabel: "Voz da narração",
  voiceHint: "Escolha a voz que vai narrar sua mensagem ao vivo na transmissão.",
  termsPrefix: "Ao utilizar nossos serviços, você concorda com os",
  termsLinkLabel: "Termos de Uso",
  amountLabel: "Valor da doação",
  amountPlaceholder: "0,00",
  presetsCents: [200, 500, 1000, 2500, 5000],
  submitLabel: "Gerar PIX",
  submitLoadingLabel: "Gerando...",
  pixTitle: "Escaneie pra pagar",
  pixSubtitle:
    "Abra o app do seu banco, escaneie o QR ou use o copia e cola. Assim que o pagamento cair, sua mensagem entra na fila.",
  copyLabel: "Copiar código",
  copiedLabel: "Copiado!",
  waitingLabel: "Aguardando pagamento...",
  expiresLabel: "Expira em",
  expiredTitle: "QR Code expirou",
  expiredSubtitle:
    "O tempo para pagar esse PIX acabou. Gere um novo código para concluir sua doação.",
  newQrLabel: "Gerar novo PIX",
  success: {
    publishedLines: ["PAGAMENTO", "RECEBIDO!"],
    publishedSubtitle:
      "Valeu pela doação! Sua mensagem entrou na fila e vai aparecer na live em instantes.",
    approvalLines: ["PAGAMENTO", "RECEBIDO!"],
    approvalSubtitle:
      "Valeu pela doação! Sua mensagem foi enviada pra aprovação e aparece na live assim que liberada.",
    rejectedLines: ["MENSAGEM", "NÃO LIBERADA"],
    rejectedSubtitle:
      "Sua doação foi recebida, mas a mensagem não passou na moderação. Fale com o suporte se precisar.",
    resetLabel: "Fazer outra doação",
  },
  errors: {
    name_required: "Escolha como você quer aparecer na live.",
    message_required: "Escreva sua mensagem antes de continuar.",
    amount_below_min: "O valor está abaixo do mínimo permitido.",
    too_many_requests: "Muitas tentativas. Aguarde um pouco e tente de novo.",
    network: "Falha de conexão. Tente novamente.",
    unknown: "Algo deu errado. Tente novamente.",
  },
};
