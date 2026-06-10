import { getHeroData } from "@/features/hero/services/hero.service";
import { Hero } from "@/features/hero/components/Hero";
import { getHeaderData } from "@/features/header/services/header.service";
import { Header } from "@/features/header/components/Header";
import { getMarqueeData } from "@/features/marquee/services/marquee.service";
import { WaveMarquee } from "@/features/marquee/components/WaveMarquee";
import { getPlansContent } from "@/features/members/services/plans.service";
import { PlansSection } from "@/features/members/components/PlansSection";
import { getShowcaseData } from "@/features/showcase/services/showcase.service";
import { ChannelStoreSection } from "@/features/showcase/components/ChannelStoreSection";
import { getFooterData } from "@/features/footer/services/footer.service";
import { Footer } from "@/features/footer/components/Footer";
import { IntroProvider } from "@/features/intro/context/IntroProvider";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroData = await getHeroData();
  const headerData = await getHeaderData();
  const marqueeData = await getMarqueeData();
  const plansContent = await getPlansContent();
  const showcaseData = await getShowcaseData();
  const footerData = await getFooterData();

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <IntroProvider>
        <div id="top" className="relative w-full">
          <Header data={headerData} />
          <Hero data={heroData} />
        </div>
      </IntroProvider>
      <WaveMarquee members={marqueeData.skorpionarios} label="Skorpionários" />
      <PlansSection content={plansContent} />
      <WaveMarquee
        members={marqueeData.skorpiaos}
        label="Skorpiões"
        tone="white"
        showWave={false}
      />
      <div id="channel" className="w-full">
        <ChannelStoreSection data={showcaseData} />
      </div>
      <WaveMarquee
        members={marqueeData.skorpionzinhos}
        label="Skorpionzinhos"
        tone="gray"
        showWave={false}
      />
      <Footer data={footerData} />
    </main>
  );
}
