import { getChannelData } from "@/features/channel/services/channel.service";
import { getStoreData } from "@/features/store/services/store.service";
import { SHOWCASE_CONTENT } from "../data/content";
import { ShowcaseData } from "../types";

export const getShowcaseData = async (): Promise<ShowcaseData> => {
  const [channel, store] = await Promise.all([getChannelData(), getStoreData()]);

  return {
    content: SHOWCASE_CONTENT,
    stats: channel.stats,
    videos: channel.videos,
    products: store.products,
  };
};
