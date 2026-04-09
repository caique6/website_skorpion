"use client";

import { useCommunityDashboard } from './hooks/useCommunityDashboard';
import { RankingItem } from './components/RankingItem';
import { VideoCard } from './components/VideoCard';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CircularProgress } from '@mui/material';

export default function CommunityPage() {
  const { stats, rankedMembers, videos, isLoading } = useCommunityDashboard();

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen bg-[#1A0010] flex items-center justify-center">
        <CircularProgress sx={{ color: '#F2D43D' }} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A0010] pb-[80px]">
      <header className="relative pt-[100px] pb-[60px] px-[24px] overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(242,212,61,0.15)_0%,rgba(217,4,61,0.1)_50%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-[40px]">
          <div className="flex flex-col gap-[16px] max-w-[600px]">
            <SectionLabel>Clube de Membros</SectionLabel>
            <h1 className="font-display font-bold text-[#FFFFFF] text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em]">
              Skorpion Community
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-[16px] w-full md:w-auto">
            <Card variant="dark" className="p-[20px]">
              <span className="font-display font-bold text-[#F2D43D] text-[1.5rem]">
                {stats.activeRescues.toLocaleString('pt-BR')}
              </span>
              <span className="block font-body text-white/55 text-[0.875rem] mt-[4px]">
                Resgates Ativos
              </span>
            </Card>
            <Card variant="dark" className="p-[20px]">
              <span className="font-display font-bold text-[#F2D43D] text-[1.5rem]">
                {stats.memberCount.toLocaleString('pt-BR')}
              </span>
              <span className="block font-body text-white/55 text-[0.875rem] mt-[4px]">
                Membros Atuais
              </span>
            </Card>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-[24px] pt-[80px] grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
        <section className="lg:col-span-8 flex flex-col gap-[24px]">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-[#FFFFFF] text-[1.75rem]">Últimos Vídeos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-4 flex flex-col gap-[24px]">
          <h2 className="font-display font-semibold text-[#FFFFFF] text-[1.75rem]">Top Membros</h2>
          <Card variant="dark" className="flex flex-col gap-[12px] p-[20px]">
            {rankedMembers.map((member, index) => (
              <RankingItem key={member.id} member={member} position={index + 1} />
            ))}
          </Card>
        </aside>
      </div>
    </main>
  );
}