import { HeroData } from "../types";
import { HERO_MOCK } from "../data/mock";

export const getHeroData = async (): Promise<HeroData> => {
  return Promise.resolve(HERO_MOCK);
};