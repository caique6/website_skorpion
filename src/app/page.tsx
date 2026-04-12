import { getHeroData } from "@/features/hero/services/hero.service";
import { Hero } from "@/features/hero/components/Hero";
import { getMembersData } from "@/features/members/services/members.service";
import { MembersSection } from "@/features/members/components/MembersSection";
import { getMarqueeData } from "@/features/marquee/services/marquee.service";
import { MembersMarquee } from "@/features/marquee/components/MembersMarquee";
import { getChannelData } from "@/features/channel/services/channel.service";
import { ChannelSection } from "@/features/channel/components/ChannelSection";
import { getStoreData } from "@/features/store/services/store.service";
import { StoreSection } from "@/features/store/components/StoreSection";
import { getFooterData } from "@/features/footer/services/footer.service";
import { Footer } from "@/features/footer/components/Footer";

export default async function Home() {
  const heroData = await getHeroData();
  const membersData = await getMembersData();
  const marqueeData = await getMarqueeData();
  const channelData = await getChannelData();
  const storeData = await getStoreData();
  const footerData = await getFooterData();

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero data={heroData} />
      <MembersSection data={membersData} />
      <MembersMarquee
        members={marqueeData.skorpinarios}
        label="Skorpinários"
        accentColor="#F2CE16"
        accentBg="rgba(242,206,22,0.05)"
        accentBorder="rgba(242,206,22,0.20)"
      />
      <ChannelSection data={channelData} />
      <MembersMarquee
        members={marqueeData.skorpiaos}
        label="Skorpiões"
        accentColor="#FFFFFF"
        accentBg="rgba(255,255,255,0.04)"
        accentBorder="rgba(255,255,255,0.12)"
      />
      <StoreSection data={storeData} />
      <Footer data={footerData} />
    </main>
  );
}