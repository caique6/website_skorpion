"use client";

import { useAuthProcess } from './hooks/useAuthProcess';
import { useBenefits } from './hooks/useBenefits';
import { BenefitItem } from './components/BenefitItem';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CircularProgress } from '@mui/material';

export default function AuthPage() {
  const { benefits, isLoading: loadingBenefits } = useBenefits();
  const { status, user, code, authenticateAndGenerateCode } = useAuthProcess();

  return (
    <main className="min-h-screen bg-[#1A0010] relative flex items-center justify-center p-[24px] sm:p-[40px] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(242,212,61,0.15)_0%,rgba(217,4,61,0.1)_50%,transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-[680px] relative z-10 flex flex-col gap-[32px]">
        <div className="text-center flex flex-col items-center gap-[16px]">
          <SectionLabel>Resgate de Benefícios</SectionLabel>
          <h1 className="font-display font-bold text-[#FFFFFF] text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em]">
            Vincule sua conta
          </h1>
          <p className="font-body text-white/55 text-[1rem]">
            Autentique-se para liberar seu acesso ao clube exclusivo Skorpion.
          </p>
        </div>

        <Card variant="dark" className="flex flex-col gap-[32px]">
          {status === 'idle' && (
            <>
              <div className="flex flex-col gap-[24px]">
                {loadingBenefits ? (
                  <CircularProgress sx={{ color: '#F2D43D', alignSelf: 'center' }} />
                ) : (
                  benefits.map((benefit) => (
                    <BenefitItem key={benefit.id} benefit={benefit} />
                  ))
                )}
              </div>
              <Button onClick={authenticateAndGenerateCode} className="w-full">
                Autenticar com Google
              </Button>
            </>
          )}

          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-[40px] gap-[16px]">
              <CircularProgress sx={{ color: '#F2D43D' }} />
              <span className="font-body text-[#FFFFFF]">Validando assinatura...</span>
            </div>
          )}

          {status === 'authenticated' && user && code && (
            <div className="flex flex-col items-center text-center gap-[24px]">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[#F2D43D]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-display font-semibold text-[#FFFFFF] text-[1.75rem]">
                  Bem-vindo, {user.name}!
                </h2>
                <span className="font-body text-[#F2D43D]">{user.membershipLevel}</span>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-[12px] p-[24px] w-full">
                <span className="font-body text-white/55 text-[0.875rem] uppercase tracking-[0.08em] block mb-[8px]">
                  Seu Código de Resgate
                </span>
                <span className="font-display font-bold text-[#FFFFFF] text-[1.5rem] tracking-[0.1em]">
                  {code.code}
                </span>
              </div>

              <Button className="w-full">
                Enviar para o Bot no WhatsApp
              </Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}