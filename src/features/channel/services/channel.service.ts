import { ChannelData } from "../types";
import { CHANNEL_MOCK } from "../data/mock";

export const getChannelData = async (): Promise<ChannelData> => {
  return Promise.resolve(CHANNEL_MOCK);
};