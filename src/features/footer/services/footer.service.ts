import { FooterData } from "../types";
import { FOOTER_MOCK } from "../data/mock";

export const getFooterData = async (): Promise<FooterData> => {
  return Promise.resolve(FOOTER_MOCK);
};