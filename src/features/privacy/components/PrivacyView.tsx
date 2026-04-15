"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";

const SECTIONS = [
  {
    id: "s-01",
    title: "Quem somos",
    content: `O Clube Amigos do Skorpion é a comunidade oficial de membros do canal Skorpion Gamer no YouTube. Esta política descreve como coletamos, usamos e protegemos os dados que você nos fornece ao resgatar seus benefícios de membro através desta plataforma.`,
  },
  {
    id: "s-02",
    title: "Quais dados coletamos",
    content: `Ao realizar o resgate de benefícios, coletamos exclusivamente os dados que você nos fornece de forma ativa e consciente:\n\n• Nome e foto de perfil da sua conta Google\n• Endereço de e-mail vinculado à sua conta Google\n• Identificador público do seu canal do YouTube (Channel ID)\n• Número de telefone fornecido voluntariamente ao bot de atendimento no WhatsApp\n\nNão coletamos senhas, dados bancários, documentos pessoais ou qualquer outra informação além das listadas acima.`,
  },
  {
    id: "s-03",
    title: "Para que usamos seus dados",
    content: `Os dados coletados têm finalidade exclusiva de:\n\n• Verificar se você é um membro ativo do Clube Amigos do Skorpion no YouTube\n• Gerar e vincular seu código único de resgate de benefícios\n• Identificar seu nível de membership (Skorpionzinho, Skorpião ou Skorpionário)\n• Direcionar você ao grupo correto de WhatsApp correspondente ao seu plano\n• Registrar benefícios recebidos como sorteios, gravações e aparições em vídeos\n\nSeus dados nunca serão utilizados para fins publicitários, vendidos a terceiros ou compartilhados fora do contexto do clube.`,
  },
  {
    id: "s-04",
    title: "Como seus dados são armazenados",
    content: `Seus dados são armazenados em banco de dados seguro com as seguintes proteções:\n\n• Acesso restrito por políticas de segurança em nível de linha (Row Level Security)\n• Dados sensíveis como e-mail e telefone visíveis apenas para administradores autenticados\n• Foto de perfil armazenada em servidor de armazenamento seguro com acesso público apenas para exibição no ranking e no marquee da plataforma\n• Nenhum dado sensível é exibido publicamente — apenas nome e foto são visíveis para outros membros`,
  },
  {
    id: "s-05",
    title: "Autenticação via Google",
    content: `Utilizamos o Google OAuth exclusivamente para identificar seu canal do YouTube e confirmar seu membership ativo. Não armazenamos sua senha do Google em nenhuma hipótese.\n\nO acesso solicitado ao YouTube é somente leitura — verificamos apenas se você é membro do canal. Não publicamos, editamos ou acessamos nenhum conteúdo da sua conta do YouTube.`,
  },
  {
    id: "s-06",
    title: "Menores de idade",
    content: `O Clube Amigos do Skorpion pode ser assinado por menores de 18 anos, desde que a assinatura seja realizada e autorizada pelos pais ou responsáveis legais, conforme exigido pelo YouTube para membros do canal.\n\nAo prosseguir com o resgate de benefícios, consideramos que o responsável legal está ciente e de acordo com a coleta dos dados descritos nesta política.`,
  },
  {
    id: "s-07",
    title: "Seus direitos",
    content: `Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), você tem direito a:\n\n• Saber quais dados seus estão armazenados\n• Solicitar a correção de dados incorretos\n• Solicitar a exclusão dos seus dados da nossa base\n• Revogar o consentimento de uso dos seus dados a qualquer momento\n\nPara exercer qualquer um desses direitos, entre em contato conosco pelo WhatsApp oficial do clube.`,
  },
  {
    id: "s-08",
    title: "Retenção dos dados",
    content: `Seus dados são mantidos enquanto sua assinatura do clube estiver ativa ou enquanto você mantiver vínculo com a comunidade Amigos do Skorpion.\n\nCaso sua assinatura seja cancelada, seus dados poderão ser mantidos por até 90 dias para fins de resolução de eventuais pendências, sendo excluídos automaticamente após esse período mediante solicitação.`,
  },
  {
    id: "s-09",
    title: "Alterações nesta política",
    content: `Esta política pode ser atualizada periodicamente para refletir mudanças na plataforma ou na legislação aplicável. Alterações relevantes serão comunicadas através dos canais oficiais do Skorpion Gamer.\n\nA data da última atualização está indicada no rodapé desta página. O uso contínuo da plataforma após alterações implica na aceitação da nova versão.`,
  },
  {
    id: "s-10",
    title: "Contato",
    content: `Dúvidas sobre esta política ou sobre o tratamento dos seus dados podem ser enviadas pelo WhatsApp oficial do Clube Amigos do Skorpion, acessível através do fluxo de resgate de benefícios nesta plataforma.`,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
};

export const PrivacyView = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="w-full flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 border-b border-[#1A1A1A]/06"
      >
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-full border border-[#1A1A1A]/12 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 hover:border-[#1A1A1A]/25 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
          <span className="font-black text-sm uppercase tracking-widest text-[#1A1A1A]/30">
            Skorpion
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#1A1A1A]/25">
          <Shield className="w-4 h-4" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em]">
            Privacidade
          </span>
        </div>
      </motion.header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-12 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="flex flex-col gap-3 mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 text-skorpion-red">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">
              Política de Privacidade
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.05]">
            SEUS DADOS,<br />NOSSA<br />RESPONSABILIDADE
          </h1>
          <p className="text-[#1A1A1A]/55 text-sm lg:text-base font-medium leading-relaxed max-w-lg mt-2">
            Transparência total sobre como o Clube Amigos do Skorpion coleta, usa e protege as informações que você nos confia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10 lg:gap-12"
        >
          {SECTIONS.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-black text-[11px] text-[#1A1A1A]/20 tracking-widest shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-[#1A1A1A]/08" />
              </div>

              <div className="flex flex-col gap-3 pl-0 lg:pl-9">
                <h2 className="font-black text-lg lg:text-xl text-[#1A1A1A] uppercase tracking-tight">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.content.split("\n\n").map((paragraph, pIndex) => (
                    <div key={pIndex} className="flex flex-col gap-1">
                      {paragraph.startsWith("•") ? (
                        <ul className="flex flex-col gap-2">
                          {paragraph.split("\n").map((line, lIndex) => (
                            <li key={lIndex} className="flex items-start gap-3">
                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-skorpion-red shrink-0" />
                              <span className="text-[#1A1A1A]/60 text-sm lg:text-base font-medium leading-relaxed">
                                {line.replace("• ", "")}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[#1A1A1A]/60 text-sm lg:text-base font-medium leading-relaxed">
                          {paragraph}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-between mt-16 pt-8 border-t border-[#1A1A1A]/08"
        >
          <span className="text-[#1A1A1A]/25 text-xs font-medium">
            Última atualização: Janeiro de 2025
          </span>
          <span className="text-[#1A1A1A]/25 text-xs font-black uppercase tracking-widest">
            Skorpion Gamer
          </span>
        </motion.div>
      </main>
    </div>
  );
};