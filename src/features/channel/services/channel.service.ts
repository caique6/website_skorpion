import { supabaseClient } from "@/lib/supabase";
import { ChannelData } from "../types";

export const getChannelData = async (): Promise<ChannelData> => {
  const [statsResult, videosResult] = await Promise.all([
    supabaseClient
      .from("channel_stats")
      .select("subscribers, total_views, total_videos, monthly_views")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single(),
    supabaseClient
      .from("channel_videos")
      .select("id, title, views, published_at, duration, url")
      .eq("active", true)
      .order("position", { ascending: true }),
  ]);

  const stats: ChannelData["stats"] = statsResult.data
    ? {
        subscribers: statsResult.data.subscribers,
        totalViews: statsResult.data.total_views,
        totalVideos: statsResult.data.total_videos,
        monthlyViews: statsResult.data.monthly_views,
      }
    : {
        subscribers: "--",
        totalViews: "--",
        totalVideos: "--",
        monthlyViews: "--",
      };

  const videos: ChannelData["videos"] = (videosResult.data ?? []).map((v) => ({
    id: v.id,
    title: v.title,
    views: v.views,
    publishedAt: v.published_at,
    duration: v.duration,
    url: v.url,
  }));

  return { stats, videos };
};