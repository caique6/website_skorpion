import { getRankingData } from "@/features/ranking/services/ranking.service";
import { RankingView } from "@/features/ranking/components/RankingView";

export const dynamic = "force-dynamic";

export default async function RankingPage() {
  const data = await getRankingData();
  return <RankingView data={data} />;
}