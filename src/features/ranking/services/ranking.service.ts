import { RankingData } from "../types";
import { RANKING_MOCK } from "../data/mock";

export const getRankingData = async (): Promise<RankingData> => {
  return Promise.resolve(RANKING_MOCK);
};