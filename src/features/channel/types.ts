export interface ChannelStats {
  subscribers: string;
  totalViews: string;
  totalVideos: string;
}

export interface ChannelVideo {
  id: string;
  title: string;
  views: string;
  publishedAt: string;
  duration: string;
  url: string;
  thumbnailUrl: string;
}

export interface ChannelData {
  stats: ChannelStats;
  videos: ChannelVideo[];
}