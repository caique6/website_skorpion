"use client";

import { useState } from 'react';
import { AuthStatus, AuthUser, RedemptionCode } from '../types/auth.types';
import { getAuthUser, getRedemptionCode } from '@/services/auth.service';

export function useAuthProcess() {
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [code, setCode] = useState<RedemptionCode | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const authenticateAndGenerateCode = async () => {
    try {
      setStatus('loading');
      
      const userData = await getAuthUser();
      setUser(userData);
      
      const codeData = await getRedemptionCode();
      setCode(codeData);
      
      setStatus('authenticated');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return { status, user, code, error, authenticateAndGenerateCode };
}