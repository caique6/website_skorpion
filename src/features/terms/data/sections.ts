export interface TermsSection {
  id: string
  title: string
  content: string
}

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "t-01",
    title: "Aceitação dos termos",
    content:
      "Ao acessar e utilizar a plataforma de resgate de benefícios do Clube Amigos do Skorpion, você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso.\n\nCaso não concorde com qualquer disposição aqui descrita, não utilize esta plataforma nem os serviços a ela vinculados.",
  },
  {
    id: "t-02",
    title: "Elegibilidade",
    content:
      "Para utilizar esta plataforma e resgatar seus benefícios, você deve:\n\n• Ser assinante ativo do Clube Amigos do Skorpion no YouTube, em qualquer nível de membership (Skorpionzinho, Skorpião ou Skorpionário)\n• Possuir um canal do YouTube com ID público (no formato UCxxxxxxxxxxxxxxxxxxxxxx)\n• Não ter tido sua conta suspensa ou banida pela administração do clube\n\nA plataforma pode ser utilizada por menores de 18 anos, desde que com autorização do responsável legal.",
  },
  {
    id: "t-03",
    title: "Código de resgate",
    content:
      "Ao verificar seu membership, a plataforma gera um código único de resgate no formato SKORP-XXXX-XXXX. Sobre este código:\n\n• O código é pessoal, intransferível e de uso exclusivo do titular\n• O código inicial é válido para um único uso: após ser utilizado no bot de WhatsApp, é automaticamente invalidado\n• Um novo código permanente é gerado e enviado ao seu WhatsApp após o resgate\n• O código permanente é o seu identificador exclusivo no ecossistema do clube\n• Compartilhar, vender ou transferir seu código para terceiros é estritamente proibido e sujeito a banimento imediato",
  },
  {
    id: "t-04",
    title: "Benefícios por tier",
    content:
      "Os benefícios variam conforme o nível de membership ativo no YouTube:\n\n• Skorpionzinho: acesso à plataforma de resgate e benefícios do ecossistema, sem acesso a grupos de WhatsApp\n• Skorpião: todos os benefícios do Skorpionzinho mais acesso ao grupo exclusivo de WhatsApp Skorpião\n• Skorpionário: todos os benefícios anteriores mais acesso ao grupo exclusivo de WhatsApp Skorpionário e demais vantagens premium\n\nOs benefícios podem ser alterados pela administração conforme mudanças nos planos do canal do YouTube.",
  },
  {
    id: "t-05",
    title: "Acesso aos grupos de WhatsApp",
    content:
      "O acesso aos grupos de WhatsApp é concedido exclusivamente via bot de atendimento oficial do clube, mediante apresentação do código de resgate válido. Ao resgatar o acesso:\n\n• Seu número de telefone é vinculado ao seu perfil de membro\n• Um único número de telefone pode estar vinculado a um único membership\n• A tentativa de vincular um número já cadastrado a outro membership é detectada automaticamente e reportada à administração\n• A administração reserva-se o direito de remover membros dos grupos por violação destes termos",
  },
  {
    id: "t-06",
    title: "Conduta e uso aceitável",
    content:
      "Ao utilizar os serviços do clube, você se compromete a:\n\n• Não tentar resgatar benefícios utilizando o Channel ID de outro membro\n• Não utilizar ferramentas automatizadas, bots ou scripts para interagir com a plataforma\n• Não realizar engenharia reversa dos mecanismos de segurança da plataforma\n• Não compartilhar seu código de resgate em redes sociais, fóruns ou qualquer meio público\n• Respeitar as regras de convivência dos grupos de WhatsApp do clube",
  },
  {
    id: "t-07",
    title: "Segurança e prevenção de fraudes",
    content:
      "A plataforma monitora ativamente tentativas de uso indevido, incluindo:\n\n• Múltiplas tentativas de resgate com o mesmo IP ou canal em curto período de tempo\n• Uso de um número de telefone já cadastrado para resgatar um código diferente\n• Padrões de requisição que indiquem automação ou varredura de códigos\n\nA detecção de qualquer uma dessas atividades resulta em bloqueio temporário ou permanente e notificação imediata à administração do clube.",
  },
  {
    id: "t-08",
    title: "Suspensão e revogação de acesso",
    content:
      "A administração do clube reserva-se o direito de suspender ou revogar o acesso de qualquer membro que:\n\n• Viole estes Termos de Uso\n• Compartilhe seu código com terceiros\n• Tente fraudar o sistema de resgate\n• Descumpra as regras de conduta dos grupos de WhatsApp\n• Cancele ou perca o membership ativo no YouTube\n\nEm casos de cancelamento de membership, o acesso aos grupos de WhatsApp será revogado mediante verificação periódica de membros ativos.",
  },
  {
    id: "t-09",
    title: "Limitação de responsabilidade",
    content:
      "O Clube Amigos do Skorpion não se responsabiliza por:\n\n• Indisponibilidade temporária da plataforma ou do bot de WhatsApp\n• Perda de código de resgate por negligência do usuário\n• Uso indevido do código por terceiros em caso de compartilhamento voluntário\n• Alterações nos planos de membership do YouTube fora do controle do clube\n\nOs benefícios oferecidos são complementares ao membership do YouTube e podem ser alterados sem aviso prévio.",
  },
  {
    id: "t-10",
    title: "Alterações nestes termos",
    content:
      "Estes Termos de Uso podem ser atualizados periodicamente. Alterações relevantes serão comunicadas pelos canais oficiais do Skorpion Gamer.\n\nO uso contínuo da plataforma após a publicação de novos termos implica na aceitação automática das mudanças.",
  },
  {
    id: "t-11",
    title: "Contato e suporte",
    content:
      "Para dúvidas, reclamações ou exercício de direitos relacionados a estes Termos de Uso, entre em contato pelo WhatsApp oficial do Clube Amigos do Skorpion, acessível através do fluxo de resgate de benefícios nesta plataforma.",
  },
]
