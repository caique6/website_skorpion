export interface ChannelStats {
  subscribers: string;
  totalViews: string;
  totalVideos: string;
  monthlyViews: string;
}

export interface ChannelVideo {
  id: string;
  title: string;
  views: string;
  publishedAt: string;
  duration: string;
  url: string;
}

export interface ChannelData {
  stats: ChannelStats;
  videos: ChannelVideo[];
}