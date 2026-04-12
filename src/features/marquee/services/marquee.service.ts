import { MarqueeData } from "../types";
import { MARQUEE_MOCK } from "../data/mock";

export const getMarqueeData = async (): Promise<MarqueeData> => {
  return Promise.resolve(MARQUEE_MOCK);
};