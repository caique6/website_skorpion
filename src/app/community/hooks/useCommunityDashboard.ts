"use client";

import { useState, useEffect, useCallback } from 'react';
import { ChannelStats, Testimonial, RankedMember, YouTubeVideo, StoreProduct } from '../types/community.types';
import { getChannelStats, getTestimonials, getRankedMembers, getYouTubeVideos, getStoreProducts } from '@/services/community.service';

interface CommunityData {
  stats: ChannelStats | null;
  testimonials: Testimonial[];
  rankedMembers: RankedMember[];
  videos: YouTubeVideo[];
  products: StoreProduct[];
}

export function useCommunityDashboard() {
  const [data, setData] = useState<CommunityData>({
    stats: null,
    testimonials: [],
    rankedMembers: [],
    videos: [],
    products: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [stats, testimonials, rankedMembers, videos, products] = await Promise.all([
        getChannelStats(),
        getTestimonials(),
        getRankedMembers(),
        getYouTubeVideos(),
        getStoreProducts()
      ]);

      setData({ stats, testimonials, rankedMembers, videos, products });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return { ...data, isLoading, error, refetch: loadDashboardData };
}