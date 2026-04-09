"use client";

import { useState, useEffect } from 'react';
import { Benefit } from '../types/auth.types';
import { getBenefits } from '@/services/auth.service';

export function useBenefits() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        setIsLoading(true);
        const data = await getBenefits();
        setBenefits(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBenefits();
  }, []);

  return { benefits, isLoading, error };
}