import { Benefit, AuthUser, RedemptionCode } from '@/app/auth/types/auth.types';
import { benefitsMock, authUserMock, redemptionCodeMock } from '@/data/mock/auth.mock';

export async function getBenefits(): Promise<Benefit[]> {
  return benefitsMock;
}

export async function getAuthUser(): Promise<AuthUser> {
  return authUserMock;
}

export async function getRedemptionCode(): Promise<RedemptionCode> {
  return redemptionCodeMock;
}