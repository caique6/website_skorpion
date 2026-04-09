import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { IconContainer } from '@/components/ui/IconContainer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1A0010] flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(242,212,61,0.15)_0%,rgba(217,4,61,0.1)_40%,transparent_70%)] pointer-events-none" />

      <nav className="w-full h-[64px] bg-[#1A0010]/85 backdrop-blur-[12px] border-b border-white/5 fixed top-0 z-50 flex items-center px-[24px] md:px-[80px]">
        <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center">
          <span className="font-display font-bold text-[#FFFFFF] text-[1.25rem] tracking-tight">
            SKORPION<span className="text-[#F2D43D]">.</span>
          </span>
          <Link href="/auth">
            <Button variant="secondary" className="px-[16px] py-[8px] text-[0.75rem]">
              Acessar Painel
            </Button>
          </Link>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center pt-[140px] pb-[80px] px-[24px] z-10 text-center max-w-[800px] mx-auto w-full gap-[32px]">
        <div className="flex flex-col items-center gap-[16px]">
          <SectionLabel>Portal Exclusivo</SectionLabel>
          <h1 className="font-display font-bold text-[#FFFFFF] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
            Resgate seus <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2D43D] to-[#F27405]">
              Benefícios de Membro
            </span>
          </h1>
          <p className="font-body text-white/55 text-[1.125rem] md:text-[1.25rem] leading-[1.6] max-w-[600px] mt-[8px]">
            Conecte sua conta do YouTube, valide sua assinatura e desbloqueie acesso imediato ao nosso grupo VIP, cargos no Discord e recompensas exclusivas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-[16px] w-full sm:w-auto mt-[16px]">
          <Link href="/auth">
            <Button className="w-full sm:w-auto px-[40px] py-[16px] text-[1.1rem]">
              Iniciar Resgate Agora
            </Button>
          </Link>
        </div>
      </section>

      <section className="px-[24px] pb-[140px] z-10 w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          <Card variant="dark" className="flex flex-col gap-[16px] items-start">
            <IconContainer iconName="AccountCircle" variant="dark" />
            <h3 className="font-display font-semibold text-[#FFFFFF] text-[1.25rem]">
              1. Conecte sua Conta
            </h3>
            <p className="font-body text-white/55 text-[0.95rem]">
              Faça login de forma segura com a conta Google que você utiliza para assinar o canal do Skorpion.
            </p>
          </Card>

          <Card variant="dark" className="flex flex-col gap-[16px] items-start">
            <IconContainer iconName="Security" variant="dark" />
            <h3 className="font-display font-semibold text-[#FFFFFF] text-[1.25rem]">
              2. Validação Automática
            </h3>
            <p className="font-body text-white/55 text-[0.95rem]">
              Nosso sistema verifica seu nível de membro no YouTube em segundos, sem expor seus dados sensíveis.
            </p>
          </Card>

          <Card variant="dark" className="flex flex-col gap-[16px] items-start">
            <IconContainer iconName="Key" variant="dark" />
            <h3 className="font-display font-semibold text-[#FFFFFF] text-[1.25rem]">
              3. Gere seu Acesso
            </h3>
            <p className="font-body text-white/55 text-[0.95rem]">
              Receba seu código único e envie para nosso Bot no WhatsApp para liberar todos os seus benefícios.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}