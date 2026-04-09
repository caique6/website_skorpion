import { ChannelStats, Testimonial, RankedMember, YouTubeVideo, StoreProduct } from '@/app/community/types/community.types';
import { channelStatsMock, testimonialsMock, rankedMembersMock, youtubeVideosMock, storeProductsMock } from '@/data/mock/community.mock';

export async function getChannelStats(): Promise<ChannelStats> {
  return channelStatsMock;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsMock;
}

export async function getRankedMembers(): Promise<RankedMember[]> {
  return rankedMembersMock;
}

export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  return youtubeVideosMock;
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  return storeProductsMock;
}