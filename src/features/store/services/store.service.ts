import { StoreData } from "../types";
import { STORE_MOCK } from "../data/mock";

export const getStoreData = async (): Promise<StoreData> => {
  return Promise.resolve(STORE_MOCK);
};