import { HeaderData } from "../types";
import { HEADER_MOCK } from "../data/mock";

export const getHeaderData = async (): Promise<HeaderData> => {
  return Promise.resolve(HEADER_MOCK);
};