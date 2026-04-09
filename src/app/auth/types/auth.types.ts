// src/app/auth/types/auth.types.ts
export type MembershipLevel = 'RP 50' | 'RP 300' | 'RP 9999';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  minimumLevel: MembershipLevel;
}

export interface AuthUser {
  id: string;
  googleId: string;
  youtubeChannelId: string;
  name: string;
  email: string;
  avatarUrl: string;
  membershipLevel: MembershipLevel;
  isActive: boolean;
  joinedAt: string;
}

export interface RedemptionCode {
  id: string;
  userId: string;
  code: string;
  status: 'active' | 'used' | 'expired';
  generatedAt: string;
  expiresAt: string;
}