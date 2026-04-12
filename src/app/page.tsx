import { getHeroData } from "@/features/hero/services/hero.service";
import { Hero } from "@/features/hero/components/Hero";
import { getMembersData } from "@/features/members/services/members.service";
import { MembersSection } from "@/features/members/components/MembersSection";

export default async function Home() {
  const heroData = await getHeroData();
  const membersData = await getMembersData();

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero data={heroData} />
      <MembersSection data={membersData} />
    </main>
  );
}