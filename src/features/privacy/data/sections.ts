export interface PolicySection {
  id: string
  title: string
  content: string
}

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "s-01",
    title: "Quem somos",
    content:
      "O Clube Amigos do Skorpion é a comunidade oficial de membros do canal Skorpion Gamer no YouTube. Esta política descreve como coletamos, usamos e protegemos os dados que você nos fornece ao resgatar seus benefícios de membro através desta plataforma.",
  },
  {
    id: "s-02",
    title: "Quais dados coletamos",
    content:
      "Os dados dos membros são coletados pela administração do clube diretamente do YouTube Studio e armazenados de forma segura. Você não precisa fazer login com o Google para utilizar esta plataforma.\n\nOs dados mantidos no sistema incluem:\n\n• Nome e foto de perfil do canal do YouTube\n• Identificador público do canal do YouTube (Channel ID)\n• Nível de membership (Skorpionzinho, Skorpião ou Skorpionário)\n• Número de telefone fornecido voluntariamente ao bot de atendimento no WhatsApp\n• Código único de resgate gerado pela plataforma\n• Datas de início e expiração da assinatura\n\nNão coletamos senhas, dados bancários, documentos pessoais ou qualquer outra informação além das listadas acima.",
  },
  {
    id: "s-03",
    title: "Como funciona o resgate",
    content:
      "Para resgatar seus benefícios, você informa manualmente o ID do seu canal do YouTube nesta plataforma. O sistema verifica se esse canal está cadastrado como membro ativo e, caso positivo, gera um código único de resgate (no formato SKORP-XXXX-XXXX).\n\nEsse código inicial é de uso único: ao ser utilizado no bot de WhatsApp do clube, ele é invalidado e substituído por um novo código permanente, que será o seu identificador exclusivo no ecossistema do clube.\n\nNenhum login externo é exigido. O ID do canal é informado por você e verificado localmente em nossa base de dados.",
  },
  {
    id: "s-04",
    title: "Para que usamos seus dados",
    content:
      "Os dados coletados têm finalidade exclusiva de:\n\n• Verificar se você é um membro ativo do Clube Amigos do Skorpion no YouTube\n• Gerar e vincular seu código único de resgate de benefícios\n• Identificar seu nível de membership e direcionar ao grupo correto de WhatsApp\n• Registrar benefícios recebidos como sorteios, gravações e aparições em vídeos\n• Prevenir uso indevido de códigos por terceiros não autorizados\n\nSeus dados nunca serão utilizados para fins publicitários, vendidos a terceiros ou compartilhados fora do contexto do clube.",
  },
  {
    id: "s-05",
    title: "Como seus dados são armazenados",
    content:
      "Seus dados são armazenados em banco de dados seguro com as seguintes proteções:\n\n• Acesso restrito por políticas de segurança em nível de linha (Row Level Security — RLS)\n• Dados sensíveis como e-mail e telefone acessíveis apenas para administradores autenticados\n• Foto de perfil servida através de endpoint proxy interno — a URL original de armazenamento nunca é exposta ao navegador\n• Channel ID não é exibido publicamente em nenhuma parte da plataforma\n• Nomes dos membros não são exibidos publicamente no site",
  },
  {
    id: "s-06",
    title: "Segurança e prevenção de fraudes",
    content:
      "Adotamos medidas técnicas para proteger os membros contra uso indevido da plataforma:\n\n• Rate limiting: o número de tentativas de resgate é limitado por endereço IP e por canal, com contadores persistentes no banco de dados\n• Detecção de duplicidade: um número de telefone não pode ser vinculado a mais de um membro\n• Alertas automáticos: tentativas de fraude são detectadas e notificadas imediatamente à administração\n• Rotação de código: o código inicial de resgate é invalidado após o primeiro uso e substituído por um código definitivo e pessoal\n• Mensagens fora do escopo correto são ignoradas pelo bot de atendimento",
  },
  {
    id: "s-07",
    title: "Menores de idade",
    content:
      "O Clube Amigos do Skorpion pode ser assinado por menores de 18 anos, desde que a assinatura seja realizada e autorizada pelos pais ou responsáveis legais, conforme exigido pelo YouTube para membros do canal.\n\nAo prosseguir com o resgate de benefícios, consideramos que o responsável legal está ciente e de acordo com a coleta dos dados descritos nesta política.",
  },
  {
    id: "s-08",
    title: "Seus direitos (LGPD)",
    content:
      "Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), você tem direito a:\n\n• Saber quais dados seus estão armazenados\n• Solicitar a correção de dados incorretos\n• Solicitar a exclusão dos seus dados da nossa base\n• Revogar o consentimento de uso dos seus dados a qualquer momento\n\nPara exercer qualquer um desses direitos, entre em contato pelo WhatsApp oficial do clube.",
  },
  {
    id: "s-09",
    title: "Retenção dos dados",
    content:
      "Seus dados são mantidos enquanto sua assinatura do clube estiver ativa ou enquanto você mantiver vínculo com a comunidade Amigos do Skorpion.\n\nCaso sua assinatura seja cancelada, seus dados poderão ser mantidos por até 90 dias para fins de resolução de eventuais pendências, sendo excluídos mediante solicitação após esse período.",
  },
  {
    id: "s-10",
    title: "Alterações nesta política",
    content:
      "Esta política pode ser atualizada periodicamente para refletir mudanças na plataforma ou na legislação aplicável. Alterações relevantes serão comunicadas através dos canais oficiais do Skorpion Gamer.\n\nA data da última atualização está indicada no rodapé desta página. O uso contínuo da plataforma após alterações implica na aceitação da nova versão.",
  },
  {
    id: "s-11",
    title: "Contato",
    content:
      "Dúvidas sobre esta política ou sobre o tratamento dos seus dados podem ser enviadas pelo WhatsApp oficial do Clube Amigos do Skorpion, acessível através do fluxo de resgate de benefícios nesta plataforma.",
  },
]
