// src/app/community/types/community.types.ts
import { MembershipLevel } from '@/app/auth/types/auth.types';

export interface ChannelStats {
  subscriberCount: number;
  memberCount: number;
  activeRescues: number;
  totalViews: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  membershipLevel: MembershipLevel;
  message: string;
  createdAt: string;
}

export interface RankedMember {
  id: string;
  name: string;
  avatarUrl: string;
  membershipLevel: MembershipLevel;
  monthsActive: number;
  points: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt: string;
  durationInSeconds: number;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  externalUrl: string;
}