import { ChannelStats, ChannelVideo } from "@/features/channel/types";
import { StoreProduct } from "@/features/store/types";

export interface ShowcaseContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  subscribersLabel: string;
  viewsLabel: string;
  videosLabel: string;
  channelUrl: string;
  comingSoonLabel: string;
}

export interface ShowcaseData {
  content: ShowcaseContent;
  stats: ChannelStats;
  videos: ChannelVideo[];
  products: StoreProduct[];
}
